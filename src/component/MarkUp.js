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
  const [selectedMarker, setSelectedMarker] = useState(null);

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

      const newMarker = new window.kakao.maps.Marker({
        position: latlng,
        map: map,
        clickable: true,
      });

      setMarkers((prevMarkers) => [...prevMarkers, newMarker]);
      setSelectedMarker(newMarker);

      // React에서 HTML 요소를 만들어서 커스텀 인포윈도우로 삽입
      const infoWindowDiv = document.createElement('div');
      const root = createRoot(infoWindowDiv);
      root.render(
        <InfoWindowContent
          message={mes}
          onWriteMemo={() => setModalOpen(true)}
          onLike={() => addFavorite(mes, lat, lng)}
          onClose={() => {
            if (infoWindowDiv) {
              infoWindowDiv.style.display = 'none';
            }
          }}
        />
      );

      // 커스텀 인포윈도우를 마커 위에 표시
      const projection = map.getProjection();
      const point = projection.containerPointFromCoords(latlng);

      infoWindowDiv.style.position = 'absolute';
      infoWindowDiv.style.left = `${point.x}px`;
      infoWindowDiv.style.top = `${point.y}px`;
      infoWindowDiv.style.transform = 'translate(-50%, -100%)';
      infoWindowDiv.style.zIndex = 3;

      map.getNode().appendChild(infoWindowDiv);

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
    };
  }, []);

  return (
    <div>
      {isModalOpen && <MemoModal onClose={() => setModalOpen(false)} onSave={saveMemo} />}
    </div>
  );
}

export default MarkUp;
