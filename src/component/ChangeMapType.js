import React, { useState, useEffect } from 'react';
import { getMap } from '../utils/KakaoMapApi';
import styles from '../component/ChangeMapType.module.scss';

function ChangeMapType() {

  const [type, setType] = useState("");

  useEffect(() => {
    const map = getMap();
    if (!map) {
      console.error("지도가 없습니다.");
      return;
    }

    let mapTypeId;

    switch (type) {
      case 'traffic':
        mapTypeId = window.kakao.maps.MapTypeId.TRAFFIC;
        break;
      case 'roadview':
        mapTypeId = window.kakao.maps.MapTypeId.ROADVIEW;
        break;
      case 'terrain':
        mapTypeId = window.kakao.maps.MapTypeId.TERRAIN;
        break;
      case 'use_district':
        mapTypeId = window.kakao.maps.MapTypeId.USE_DISTRICT;
        break;
      case 'normal':
        mapTypeId = window.kakao.maps.MapTypeId.NORMAL;
        break;
      default:
        return;
    }

    map.addOverlayMapTypeId(mapTypeId);

    return () => {
      map.removeOverlayMapTypeId(mapTypeId);
    };
  }, [type]);

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
