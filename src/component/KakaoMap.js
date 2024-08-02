import React, { useEffect } from 'react';
import { InitializeMap } from '../utils/KakaoMapApi';
import styles from './KakaoMap.module.scss';


const KakaoMap = ({ setLevel }) => {
  useEffect(() => {
    const initialize = async () => {
      try {
        console.log("지도 초기화 시작");
        await InitializeMap(setLevel);
        console.log("지도 초기화 완료");
      } catch (error) {
        console.error('지도 초기화 중 오류 발생:', error);
      }
    };


    initialize(); // DOM이 준비된 후에 초기화 함수 실행


    return () => {
      // 추가적인 클린업 로직이 필요한 경우 여기에 작성
    };
  }, [setLevel]);


  return (
    <div className={styles.mapContainer}>
      <div id="map" className={styles.mapSize}></div>
    </div>
  );
};


export default KakaoMap;