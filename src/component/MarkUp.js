import React, { useState, useEffect } from 'react';
import { getMap } from '../utils/KakaoMapApi';

function MarkUp() {
  const [message, setMessage] = useState('');
  const [marker, setMarker] = useState(null);
  const [infowindow, setInfowindow] = useState(null);

  const handleClick = (mouseEvent) => {
    const latlng = mouseEvent.latLng;
    const lat = latlng.getLat();
    const lng = latlng.getLng();

    const message = `클릭한 위치의 위도는 ${lat} 이고, 경도는 ${lng} 입니다`;
    setMessage(message);

    const map = getMap();
    if (!map) {
      console.error("지도가 없습니다!");
      return;
    }

    if (marker) {
      marker.setMap(null);
    }

    if (infowindow) {
      infowindow.close();
    }

    const newMarker = new window.kakao.maps.Marker({
      position: latlng,
      map: map,
      clickable: true,
    });

    setMarker(newMarker);

    const newInfowindow = new window.kakao.maps.InfoWindow({
      content: "Hello",
      removable: true,
    });
    setInfowindow(newInfowindow);

    window.kakao.maps.event.addListener(newMarker, 'click', () => {
      if (infowindow) {
        infowindow.close();
      }

      newInfowindow.open(map, newMarker);
    });
  };

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error("Kakao Maps API가 로드되지 않았습니다.");
      return;
    }

    // Kakao Maps API가 로드된 후에 콜백 함수 실행
    window.kakao.maps.load(() => {
      const map = getMap();
      if (!map) {
        console.error("지도가 없습니다!");
        return;
      }

      // 지도에 클릭 이벤트 리스너 등록
      window.kakao.maps.event.addListener(map, 'click', handleClick);
    });

    return () => {
      const map = getMap();
      if (map) {
        // 클린업을 위해 클릭 이벤트 리스너 제거
        window.kakao.maps.event.removeListener(map, 'click', handleClick);
      }
    };
  }, [marker]);

  return (
    <div>
      <p>{message}</p>
    </div>
  );
}

export default MarkUp;
