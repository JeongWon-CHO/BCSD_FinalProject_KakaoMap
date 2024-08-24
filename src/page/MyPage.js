import React from 'react';
import useMemoStore from '../store/useMemoStore';
import { getMap } from '../utils/KakaoMapApi';
import style from './MyPage.module.scss';

function MyPage() {
    const memos = useMemoStore((state) => state.memos);
    const removeMemo = useMemoStore((state) => state.removeMemo);

    const handleMemoClick = (lat, lng) => {
        const map = getMap();
        if (!map) {
            console.error("지도가 없습니다.");
            return;
        }

        const position = new window.kakao.maps.LatLng(lat, lng);
        map.setCenter(position);

        const marker = new window.kakao.maps.Marker({
            position: position,
            map: map,
        });

        const infowindow = new window.kakao.maps.InfoWindow({
            content: `<div>장소로 이동되었습니다</div>`,
            removable: true,
        });

        infowindow.open(map, marker);
    };

    const handleRemoveMemo = (lat, lng) => {
        removeMemo(lat, lng);
    };

    return (
        <div>
            <h4 className={style.title_record}>기록</h4>
            <ul>
                {memos.map((memoObj, index) => (
                    <li className={style.list_record} key={index}>
                        <div className={style.record_content} onClick={() => handleMemoClick(memoObj.lat, memoObj.lng)}>
                            <h3 className={style.record_title}>
                                {memoObj.title && memoObj.title.length > 20 ? `${memoObj.title.substring(0, 20)}...` : memoObj.title || '제목 없음'}
                            </h3>
                            <p className={style.record_memo}>
                                {memoObj.memo && memoObj.memo.length > 50 ? `${memoObj.memo.substring(0, 50)}...` : memoObj.memo || '메모 없음'}
                            </p>
                        </div>
                        <button
                            className={style.remove_button}
                            onClick={() => handleRemoveMemo(memoObj.lat, memoObj.lng)}
                        >
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default MyPage;
