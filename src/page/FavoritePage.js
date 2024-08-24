import React from 'react';
import useFavoriteStore from '../store/useFavoriteStore';
import { getMap } from '../utils/KakaoMapApi';
import style from './FavoritePage.module.scss';

function FavoritePage() {
    const favorites = useFavoriteStore((state) => state.favorites);
    const removeFavorite = useFavoriteStore((state) => state.removeFavorite);

    const handleFavoriteClick = (favorite, lat, lng) => {
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
            content: `<div>${favorite}</div>`,
            removable: true,
        });

        infowindow.open(map, marker);
    };

    const handleRemoveClick = (lat, lng) => {
        removeFavorite(lat, lng);
    };

    return (
        <div>
            <h4 className={style.title_favorite}>즐겨찾기</h4>

            <ul>
                {favorites.map((favObj, index) => (
                    <li className={style.list_favorite} key={index}>
                        <span onClick={() => handleFavoriteClick(favObj.favorite, favObj.lat, favObj.lng)}>
                            {favObj.favorite}
                        </span>
                        <button
                            className={style.remove_button}
                            onClick={() => handleRemoveClick(favObj.lat, favObj.lng)}
                        >
                            삭제
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FavoritePage;
