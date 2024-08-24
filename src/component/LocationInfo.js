import React, { useState, useEffect } from 'react';
import { getMap } from '../utils/KakaoMapApi';
import axios from 'axios';

function LocationInfo({ lat, lng }) {
    const [locationData, setLocationData] = useState(null);

    useEffect(() => {
        const map = getMap();
        if (!map) {
            console.error("지도가 없습니다!");
            return;
        }

        const onGeoOk = (position) => {
            console.log("현재 위치는 : " + lat + ", " + lng);

            // 카카오 REST API에 GET 요청을 보낸다.
            axios.get(`https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}&input_coord=WGS84`, {
                headers: { Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_KEY}` }
            })
                .then(res => {
                    console.log(res.data.documents);
                    setLocationData(res.data.documents); // 상태에 응답 데이터 저장
                })
                .catch(e => console.log(e));
        };

        const onGeoError = () => {
            alert("위치 권한을 확인해주세요.");
        };

        // 현재 위치를 가져온다.
        navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);

    }, [lat, lng]);

    return (
        <div>
            {locationData ? (
                <div>
                    <h3>주소 정보</h3>
                    {locationData.map((doc, index) => (
                        <div key={index}>
                            <p>주소: {doc.address.address_name}</p>
                            <p>건물명: {doc.address.building_name || 'N/A'}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <p>위치 정보를 가져오는 중...</p>
            )}
        </div>
    );
}

export default LocationInfo;
