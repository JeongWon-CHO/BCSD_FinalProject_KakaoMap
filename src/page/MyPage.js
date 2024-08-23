// src/pages/MyPage.js
import React from 'react';
import useMemoStore from '../store/useMemoStore';
import { getMap } from '../utils/KakaoMapApi';

function MyPage() {
    const memos = useMemoStore((state) => state.memos);

    const handleMemoClick = (memo, lat, lng) => {
    const map = getMap();
    if (!map) {
        console.error("지도가 없습니다.");
        return;
    }

    const position = new window.kakao.maps.LatLng(lat, lng);
    map.setCenter(position); // 지도 중심을 해당 위치로 이동

    const marker = new window.kakao.maps.Marker({
        position: position,
        map: map,
    });

    const infowindow = new window.kakao.maps.InfoWindow({
        content: `<div>${memo}</div>`, // 사용자가 입력했던 메모 내용을 표시
        removable: true,
    });

    infowindow.open(map, marker);
    };

    return (
        <div>
        <h2>기록</h2>
        <ul>
            {memos.map((memoObj, index) => (
            <li key={index} onClick={() => handleMemoClick(memoObj.memo, memoObj.lat, memoObj.lng)}>
                {memoObj.memo}
            </li>
            ))}
        </ul>
        </div>
    );
}

export default MyPage;
