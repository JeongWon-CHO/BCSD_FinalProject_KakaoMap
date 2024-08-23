import React, { useState, useEffect } from 'react';
import { getMap } from '../utils/KakaoMapApi';
import MemoModal from './MemoModal';
import useMemoStore from '../store/useMemoStore';
import InfoWindowContent from './InfoWindowContent';  // InfoWindowContent 컴포넌트 임포트
import { createRoot } from 'react-dom/client';  // React 18의 createRoot 사용
import style from './MarkUp.module.scss';
import axios from "axios";

function MarkUp({ markersVisible }) {
  const [message, setMessage] = useState('');
  const [markers, setMarkers] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentLatLng, setCurrentLatLng] = useState({ lat: null, lng: null });
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [infoWindowElement, setInfoWindowElement] = useState(null);

  const addMemo = useMemoStore((state) => state.addMemo);

  const handleClick = async (mouseEvent) => {
    const latlng = mouseEvent.latLng;
    const lat = latlng.getLat();
    const lng = latlng.getLng();

    setCurrentLatLng({ lat, lng });

    const map = getMap();
    if (!map) {
      console.error("지도가 없습니다!");
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

      if (res.data.documents[0].road_address && res.data.documents[0].road_address.building_name) {
        mes = res.data.documents[0].road_address.building_name;
      } else if (res.data.documents[0].road_address) {
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

      // React에서 HTML 요소를 만들어서 인포윈도우로 삽입
      const infoWindowDiv = document.createElement('div');
      const root = createRoot(infoWindowDiv); // React 18의 createRoot 사용
      root.render(
        <InfoWindowContent
          message={mes}
          onWriteMemo={() => setModalOpen(true)}
          onLike={() => alert('좋아요 버튼 클릭됨')}
          onClose={() => {
            if (infoWindowElement) {
              infoWindowElement.close();
            }
          }}
        />
      );

      const infowindow = new window.kakao.maps.InfoWindow({
        position: latlng,
        content: infoWindowDiv,
        removable: true,
        zIndex: 3,
        pixelOffset: new window.kakao.maps.Point(0, -30)
      });

      infowindow.open(map, newMarker);
      setInfoWindowElement(infowindow);

    } catch (e) {
      console.error('API 호출 중 오류 발생:', e);
    }
  };

  useEffect(() => {
    markers.forEach((marker) => {
      marker.setVisible(markersVisible);
    });
  }, [markersVisible, markers]);

  const saveMemo = (newMemo) => {
    if (currentLatLng.lat && currentLatLng.lng) {
      addMemo(newMemo, currentLatLng.lat, currentLatLng.lng);
    }
  };

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
