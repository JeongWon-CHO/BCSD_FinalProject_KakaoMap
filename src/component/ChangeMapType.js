import React, { useState, useEffect } from 'react';
import { getMap } from '../utils/KakaoMapApi';
import styles from '../component/ChangeMapType.module.scss';

function ChangeMapType() {
  const [type, setType] = useState("normal"); 
  const [currentMapTypeId, setCurrentMapTypeId] = useState(null);

  useEffect(() => {
    const map = getMap();
    if (!map || !window.kakao || !window.kakao.maps || !window.kakao.maps.MapTypeId) {
      console.error("지도가 없거나 Kakao Maps API가 로드되지 않았습니다.");
      return;
    }

    let newMapTypeId;

    switch (type) {
      case 'traffic':
        newMapTypeId = window.kakao.maps.MapTypeId.TRAFFIC;
        break;
      case 'roadview':
        newMapTypeId = window.kakao.maps.MapTypeId.ROADVIEW;
        break;
      case 'terrain':
        newMapTypeId = window.kakao.maps.MapTypeId.TERRAIN;
        break;
      case 'use_district':
        newMapTypeId = window.kakao.maps.MapTypeId.USE_DISTRICT;
        break;
      case 'normal':
      default:
        newMapTypeId = window.kakao.maps.MapTypeId.NORMAL;
        break;
    }

    // 현재 적용된 맵 타입을 제거
    if (currentMapTypeId && currentMapTypeId !== window.kakao.maps.MapTypeId.NORMAL) {
      map.removeOverlayMapTypeId(currentMapTypeId);
    }

    // 새로운 맵 타입을 추가
    if (newMapTypeId !== window.kakao.maps.MapTypeId.NORMAL) {
      map.addOverlayMapTypeId(newMapTypeId);
    }

    // 현재 적용된 맵 타입을 상태로 저장
    setCurrentMapTypeId(newMapTypeId);

  }, [type, currentMapTypeId]);

  return (
    <div className={styles.container_btn}>

      <span>
        <button className={styles.btn_nomal} onClick={() => setType('normal')}>기본</button>
      </span>

      <span>
        <button className={styles.btn_traffic} onClick={() => setType('traffic')}>교통정보</button>
      </span>

      <span>
        <button className={styles.btn_roadview} onClick={() => setType('roadview')}>로드뷰</button>
      </span>
      
      <span>
        <button className={styles.btn_terrain} onClick={() => setType('terrain')}>지형</button>
      </span>
      
      <span>
        <button className={styles.btn_useDistrict} onClick={() => setType('use_district')}>지적편집</button>
      </span>
      
    </div>
  );
}

export default ChangeMapType;
