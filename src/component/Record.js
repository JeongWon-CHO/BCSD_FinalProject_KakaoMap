import React from 'react';
import { getMap } from '../utils/KakaoMapApi';

function Record() {

    const map = getMap();
    if (!map) {
        console.error("지도가 없습니다!");
        return;
    }




    return (
        <div>

        </div>
    )
}

export default Record;
