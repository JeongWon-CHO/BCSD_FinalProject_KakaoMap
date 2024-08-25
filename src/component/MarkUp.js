import React, { useState, useEffect } from 'react';
import { getMap } from '../utils/KakaoMapApi';
import MemoModal from './MemoModal';
import useMemoStore from '../store/useMemoStore';
import useFavoriteStore from '../store/useFavoriteStore';
import InfoWindowContent from './InfoWindowContent';
import { createRoot } from 'react-dom/client';
import axios from 'axios';

function MarkUp({ markersVisible }) {
  const [message, setMessage] = useState('');
  const [markers, setMarkers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentLatLng, setCurrentLatLng] = useState({ lat: null, lng: null });
  
  const addMemo = useMemoStore((state) => state.addMemo);
  const addFavorite = useFavoriteStore((state) => state.addFavorite);

  const handleClick = async (mouseEvent) => {
    const latlng = mouseEvent.latLng;
    const lat = latlng.getLat();
    const lng = latlng.getLng();

    setCurrentLatLng({ lat, lng });

    const map = getMap();
    if (!map) {
      console.error('지도가 없습니다!');
      return;
    }

    try {
      const res = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`,
        {
          headers: { Authorization: `KakaoAK ${process.env.REACT_APP_REST_KEY}` },
        }
      );

      let mes = '';

      if (res.data.documents[0]?.road_address?.building_name) {
        mes = res.data.documents[0].road_address.building_name;
      } else if (res.data.documents[0]?.road_address) {
        mes = res.data.documents[0].road_address.address_name;
      } else {
        mes = '주소 정보를 찾을 수 없습니다';
      }

      setMessage(mes);

      // 새 마커 생성
      const newMarker = new window.kakao.maps.Marker({
        position: latlng,
        map: map,
        clickable: true,
      });

      // 마커와 연결된 인포윈도우 생성 및 관리
      const infoWindowDiv = document.createElement('div');
      const root = createRoot(infoWindowDiv);

      root.render(
        <InfoWindowContent
          message={mes}
          onWriteMemo={() => setModalOpen(true)}
          onLike={() => {
            alert("즐겨찾기에 추가되었습니다!");
            addFavorite(mes, lat, lng);
          }}
          onClose={() => {
            // 마커와 인포윈도우 삭제
            newMarker.setMap(null);
            if (infoWindowDiv) {
              infoWindowDiv.style.display = 'none';
            }
            root.unmount();
            setMarkers((prevMarkers) => prevMarkers.filter(marker => marker !== newMarker));
          }}
        />
      );

      // 인포윈도우를 마커 위에 표시
      const projection = map.getProjection();
      const point = projection.containerPointFromCoords(latlng);

      const offsetX = -30; // 인포윈도우의 절반 너비만큼 좌우로 이동
      const offsetY = -10; // 인포윈도우의 높이만큼 위로 이동

      infoWindowDiv.style.position = 'absolute';
      infoWindowDiv.style.left = `${point.x + offsetX}px`;
      infoWindowDiv.style.top = `${point.y + offsetY}px`;
      infoWindowDiv.style.zIndex = 3;

      map.getNode().appendChild(infoWindowDiv);

      // 마커가 닫힐 때 인포윈도우와 마커 모두 삭제
      newMarker.infowindowDiv = infoWindowDiv;
      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

      return () => {
        root.unmount(); // React 18에서의 unmount 호출
        if (infoWindowDiv) {
          map.getNode().removeChild(infoWindowDiv);
        }
      };
    } catch (e) {
      console.error('API 호출 중 오류 발생:', e);
    }
  };

  const saveMemo = (newMemo) => {
    if (currentLatLng.lat && currentLatLng.lng) {
      addMemo(message, newMemo, currentLatLng.lat, currentLatLng.lng);
    }
  };

  useEffect(() => {
    const map = getMap();
    if (map) {
      markers.forEach((marker) => {
        marker.setVisible(markersVisible);
        if (marker.infowindowDiv) {
          marker.infowindowDiv.style.display = markersVisible ? 'block' : 'none';
        }
      });
    }
  }, [markersVisible, markers]);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps API가 로드되지 않았습니다.');
      return;
    }

    window.kakao.maps.load(() => {
      const map = getMap();
      if (!map) {
        console.error('지도가 없습니다.');
        return;
      }

      window.kakao.maps.event.addListener(map, 'click', handleClick);
    });

    return () => {
      const map = getMap();
      if (map) {
        window.kakao.maps.event.removeListener(map, 'click', handleClick);
      }

      markers.forEach((marker) => {
        if (marker.infowindowDiv) {
          marker.infowindowDiv.style.display = 'none';
        }
        marker.setMap(null);
      });
    };
  }, []);

  return (
    <div>
      {isModalOpen && <MemoModal onClose={() => setModalOpen(false)} onSave={saveMemo} />}
    </div>
  );
}

export default MarkUp;
