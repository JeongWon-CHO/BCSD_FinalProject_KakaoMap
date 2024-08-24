import React, { useEffect, useState } from 'react';
import { getMap, onMapReady } from '../utils/KakaoMapApi.js';
import style from '../component/CategorySearch.module.scss';

function CategorySearch() {
    const [markers, setMarkers] = useState([]); // 마커를 저장할 상태 변수
    const [map, setMap] = useState(null);

    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) {
            console.error('Kakao Maps API가 로드되지 않았습니다.');
            return;
        }

        const initializeCategorySearch = () => {
            const initializedMap = getMap();
            if (!initializedMap || typeof initializedMap.getCenter !== 'function') {
                console.error('지도가 올바르게 초기화되지 않았습니다.');
                return;
            }
            setMap(initializedMap);
        };

        // 지도 초기화 완료 시 카테고리 검색 초기화
        onMapReady(initializeCategorySearch);

    }, []);

    const searchByCategory = (category) => {
        if (!map) return;

        const ps = new window.kakao.maps.services.Places();

        ps.categorySearch(category, (data, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                // 기존 마커 삭제
                removeMarkers();

                // 새로운 마커 표시
                const newMarkers = data.map(place => displayMarker(place));
                setMarkers(newMarkers); // 새로운 마커 배열 설정
            }
        }, { location: map.getCenter(), useMapBounds: true });
    };

    const displayMarker = (place) => {
        if (!map) return null;

        const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });
        const marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(place.y, place.x),
        });

        // 클릭 이벤트 추가
        window.kakao.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
            infowindow.open(map, marker);
        });

        return marker; // 새로운 마커 반환
    };

    // 기존 마커를 제거하는 함수
    const removeMarkers = () => {
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]); // 마커 상태 초기화
    };

    const handleCategoryClick = (category) => {
        searchByCategory(category);
    };

    return (
        <div>
            <div id="category-buttons">
                <button onClick={removeMarkers} className={style.btn_clean}>초기화</button>
                <button onClick={() => handleCategoryClick('CS2')} className={style.btn_convenience}>편의점</button>
                <button onClick={() => handleCategoryClick('FD6')} className={style.btn_restaurant}>음식점</button>
                <button onClick={() => handleCategoryClick('BK9')} className={style.btn_bank}>은행</button>
                <button onClick={() => handleCategoryClick('OL7')} className={style.btn_parking}>주차장</button>
                <button onClick={() => handleCategoryClick('CE7')} className={style.btn_cafe}>카페</button>
            </div>
        </div>
    );
}

export default CategorySearch;
