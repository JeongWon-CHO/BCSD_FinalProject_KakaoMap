import React, { useEffect, useState } from 'react';
import { getMap, onMapReady } from '../utils/KakaoMapApi';
import style from './Roadview.module.scss';

function Roadview({ isVisible, setRoadviewVisible }) {
  const [roadview, setRoadview] = useState(null);
  const [roadviewClient, setRoadviewClient] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const initializeRoadview = () => {
      const map = getMap();
      if (!map) {
        console.error('지도가 없습니다!');
        return;
      }

      const rvContainer = document.querySelector(`.${style.roadview}`);
      if (!rvContainer) {
        console.error('로드뷰 컨테이너를 찾을 수 없습니다.');
        return;
      }

      const rv = new window.kakao.maps.Roadview(rvContainer);
      const rvClient = new window.kakao.maps.RoadviewClient();

      setRoadview(rv);
      setRoadviewClient(rvClient);

      const markImage = new window.kakao.maps.MarkerImage(
        'https://t1.daumcdn.net/localimg/localimages/07/2018/pc/roadview_minimap_wk_2018.png',
        new window.kakao.maps.Size(26, 46),
        {
          spriteSize: new window.kakao.maps.Size(1666, 168),
          spriteOrigin: new window.kakao.maps.Point(705, 114),
          offset: new window.kakao.maps.Point(13, 46),
        }
      );

      const newMarker = new window.kakao.maps.Marker({
        image: markImage,
        position: map.getCenter(),
        draggable: true,
      });

      setMarker(newMarker);

      // 마커 드래그 종료 이벤트 등록
      window.kakao.maps.event.addListener(newMarker, 'dragend', () => {
        const position = newMarker.getPosition(); // 마커의 새로운 위치 가져오기
        map.setCenter(position); // 지도의 중심을 마커 위치로 설정
        rv.setViewpoint({ // 로드뷰의 중심을 마커 위치로 설정
          pan: 0,
          tilt: 0,
          zoom: 0
        });
        toggleRoadview(position); // 로드뷰 업데이트
      });

      window.kakao.maps.event.addListener(map, 'click', (mouseEvent) => {
        if (!isVisible) return;

        const position = mouseEvent.latLng;
        newMarker.setPosition(position);
        toggleRoadview(position);
      });

      window.kakao.maps.event.addListener(rv, 'position_changed', function () {
        const rvPosition = rv.getPosition();
        map.setCenter(rvPosition);

        if (isVisible) {
          newMarker.setPosition(rvPosition);
        }
      });

      return () => {
        newMarker.setMap(null);
      };
    };

    if (isVisible) {
      onMapReady(initializeRoadview);
    }
  }, [isVisible]);

  const toggleRoadview = (position) => {
    if (!roadviewClient || !roadview) return;

    roadviewClient.getNearestPanoId(position, 50, (panoId) => {
      if (panoId === null) {
        toggleMapWrapper(true, position);
      } else {
        toggleMapWrapper(false, position);
        roadview.setPanoId(panoId, position);
      }
    });
  };

  const toggleMapWrapper = (active, position) => {
    const container = document.querySelector(`.${style.roadview_container}`);
    if (!container) {
      console.error('컨테이너를 찾을 수 없습니다.');
      return;
    }

    const map = getMap();
    if (!map) return;

    if (active) {
      container.className = style.roadview_container;
      map.relayout();
      map.setCenter(position);
    } else {
      if (!container.classList.contains(style.view_roadview)) {
        container.classList.add(style.view_roadview);
        map.relayout();
        map.setCenter(position);
      }
    }
  };

  useEffect(() => {
    const map = getMap();
    if (!map || !window.kakao || !window.kakao.maps || !window.kakao.maps.MapTypeId) {
      console.error('Kakao Maps API가 로드되지 않았습니다.');
      return;
    }

    if (isVisible) {
      map.addOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);
      if (marker) marker.setMap(map);
      if (marker) marker.setPosition(map.getCenter());
      toggleRoadview(map.getCenter());
    } else {
      if (map.hasOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW)) {
        map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);
      }
      if (marker) marker.setMap(null);
    }
  }, [isVisible, marker]);
  

  const closeRoadview = () => {
    if (!marker || !roadview) return;

    const map = getMap();
    if (!map) return;

    // 로드뷰 맵 타입 제거
    try {
        map.removeOverlayMapTypeId(window.kakao.maps.MapTypeId.ROADVIEW);
        console.log("ROADVIEW overlay removed");
    } catch (error) {
        console.error("Failed to remove ROADVIEW overlay:", error);
    }

    // 로드뷰 컨테이너를 숨기기
    const rvContainer = document.querySelector(`.${style.roadview}`);
    if (rvContainer) {
        rvContainer.style.display = 'none';
        console.log("ROADVIEW container hidden");
    }

    // 마커를 지도에서 제거
    marker.setMap(null);

    setRoadviewVisible(false); // 로드뷰 상태를 숨기기 상태로 설정
    toggleMapWrapper(true, marker.getPosition());
};

  return (
    <div className={style.roadview_container}>
      <div className={style.rvWrapper}>
        <div className={style.roadview}></div>

        <div className={style.closeButton} title="로드뷰 닫기" onClick={closeRoadview}>
          <span className={style.img}></span>
        </div>
      </div>

      <div className={style.mapWrapper}>
        <div className={style.roadviewControl} onClick={closeRoadview}></div>
      </div>
    </div>
  );
}

export default Roadview;
