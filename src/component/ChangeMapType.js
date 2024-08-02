import React, { useState, useEffect } from 'react';
import { getMap } from '../utils/KakaoMapApi';


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
    <div>
      <button className='btn_traffic' onClick={() => setType('traffic')}>Traffic</button>
      <button className='btn_roadview' onClick={() => setType('roadview')}>Roadview</button>
      <button className='btn_terrain' onClick={() => setType('terrain')}>Terrain</button>
      <button className='btn_useDistrict' onClick={() => setType('use_district')}>Use District</button>
      <button className='btn_nomal' onClick={() => setType('normal')}>Normal</button>
    </div>
  );
}


export default ChangeMapType;
