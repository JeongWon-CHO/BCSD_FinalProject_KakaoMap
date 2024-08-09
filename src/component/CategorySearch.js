import React, { useEffect } from 'react';
import { getMap, onMapReady } from '../utils/KakaoMapApi.js';
import style from '../component/CategorySearch.module.scss';

function CategorySearch() {
    useEffect(() => {
        if (!window.kakao || !window.kakao.maps) {
            console.error('Kakao Maps API가 로드되지 않았습니다.');
            return;
        }

        let markers = []; // 마커를 저장할 배열

        const initializeCategorySearch = () => {
            const map = getMap();
            if (!map || typeof map.getCenter !== 'function') {
                console.error('지도가 올바르게 초기화되지 않았습니다.');
                return;
            }

            const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

            const searchByCategory = (category) => {
                const ps = new window.kakao.maps.services.Places();

                ps.categorySearch(category, (data, status) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        // 기존 마커 삭제
                        removeMarkers();

                        // 새로운 마커 표시
                        data.forEach(place => {
                            displayMarker(place);
                        });
                    }
                }, { location: map.getCenter(), useMapBounds: true });
            };

            const displayMarker = (place) => {
                const marker = new window.kakao.maps.Marker({
                    map: map,
                    position: new window.kakao.maps.LatLng(place.y, place.x),
                });

                // 클릭 이벤트 추가
                window.kakao.maps.event.addListener(marker, 'click', function () {
                    infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
                    infowindow.open(map, marker);
                });

                markers.push(marker); // 배열에 마커 추가
            };

            // 기존 마커를 제거하는 함수
            const removeMarkers = () => {
                markers.forEach(marker => marker.setMap(null));
                markers = [];
            };

            document.getElementById('clean-button').onclick = () => removeMarkers();
            document.getElementById('convenience-store-button').onclick = () => searchByCategory('CS2');
            document.getElementById('restaurant-button').onclick = () => searchByCategory('FD6');
            document.getElementById('bank-button').onclick = () => searchByCategory('BK9');
            document.getElementById('parking-lot-button').onclick = () => searchByCategory('OL7');
            document.getElementById('cafe-button').onclick = () => searchByCategory('CE7');
        };

        // 지도 초기화 완료 시 카테고리 검색 초기화
        onMapReady(initializeCategorySearch);

    }, []);

    return (
        <div>
            <div id="category-buttons">
                <button id="clean-button" className={style.btn_clean}>초기화</button>
                <button id="convenience-store-button" className={style.btn_convenience}>편의점</button>
                <button id="restaurant-button" className={style.btn_restaurant}>음식점</button>
                <button id="bank-button" className={style.btn_bank}>은행</button>
                <button id="parking-lot-button" className={style.btn_parking}>주차장</button>
                <button id="cafe-button" className={style.btn_cafe}>카페</button>
            </div>
        </div>
    );
}

export default CategorySearch;
