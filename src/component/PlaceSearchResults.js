import React, { useEffect, useState } from 'react';
import { getMap } from '../utils/KakaoMapApi';
import style from './PlaceSearchResults.module.scss';

function PlaceSearchResults({ keyword }) {
    const [places, setPlaces] = useState([]);
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (!keyword) return;

        const map = getMap();
        if (!map) {
        console.error("지도가 없습니다!");
        return;
        }

        const ps = new window.kakao.maps.services.Places();
        ps.keywordSearch(keyword, (data, status) => {
        if (status === window.kakao.maps.services.Status.OK) {
            setPlaces(data);

            const bounds = new window.kakao.maps.LatLngBounds();
            const newMarkers = data.map((place) => {
            const position = new window.kakao.maps.LatLng(place.y, place.x);
            const marker = new window.kakao.maps.Marker({
                position,
                map,
            });

            window.kakao.maps.event.addListener(marker, 'click', () => {
                const infowindow = new window.kakao.maps.InfoWindow({
                content: `<div style="padding:5px;">${place.place_name}</div>`,
                });
                infowindow.open(map, marker);
            });

            bounds.extend(position);
            return marker;
            });

            map.setBounds(bounds);
            setMarkers(newMarkers);
        }
        });

        return () => {
        markers.forEach((marker) => marker.setMap(null));
        };
    }, [keyword, markers]);

    return (

        <div className={style.listContainer}>
            <p className={style.list_title}>검색 결과</p>
            <ul className={style.resultsList}>
                {places.map((place, index) => (
                    <li key={index} className={style.resultItem}>
                        {place.place_name}
                    </li>
            ))}
            </ul>
        </div>
        
    );
}

export default PlaceSearchResults;
