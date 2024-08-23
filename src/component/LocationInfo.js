import React, { useState, useEffect } from 'react';
import { getMap } from '../utils/KakaoMapApi';
import axios from "axios";

function LocationInfo({ lat, lng }) {

    const map = getMap();
    if (!map) {
        console.error("지도가 없습니다!");
        return;
    }


    navigator.geolocation.getCurrentPosition(function(pos) {
        console.log(pos);
        console.log("현재 위치는 : " + lat + ", "+ lng);
    });

    function onGeoOk(position){
        //kakao REST API에 get 요청을 보낸다.
        //파라미터 x,y에 lon,lat을 넣어주고 API_KEY를 Authorization헤더에 넣어준다.
        axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lat}&y=${lng}&input_coord=WGS84`
        ,{headers:{Authorization:`KakaoAK ${process.env.REACT_APP_KAKAO_KEY}`}}
        )
        .then(res=>{
            console.log(res.data.documents)
            
        }
        ).catch(e=>console.log(e))
    }
    function onGeoError(){
        alert("위치권한을 확인해주세요");
    }

	//navigator.geolocation.getCurrentPosition(위치받는함수, 에러났을때 함수)
	navigator.geolocation.getCurrentPosition(onGeoOk,onGeoError)

    return(
        <div>

        </div>
    );
}

export default LocationInfo;
