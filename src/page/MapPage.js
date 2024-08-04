import React, { useState } from 'react';
import MapControls from '../component/MapControls';
import ChangeMapType from '../component/ChangeMapType';
import KakaoMap from '../component/KakaoMap';
import PlaceSearch from '../component/PlaceSearch';
import style from './MapPage.module.scss';
import search_img from '../img/search-icon.png';
import logo_kakao from '../img/logo_kakaomap_en.png';
import PlaceSearchInput from '../component/PlaceSearchInput';
import PlaceSearchResults from '../component/PlaceSearchResults';
import CategorySearch from '../component/CategorySearch';


//<MapControls level={level} />

function MapPage() {

    const [level, setLevel] = useState(3);
    const [searchKeyword, setSearchKeyword] = useState('');

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    return (
        <div className={style.map_page}>

            <div className={style.map_container}>
                
                <div className={style.map_control}>

                    <div className={style.side_header}>
                        
                        <div className={style.logo_container}>
                            <img src={logo_kakao} alt='kakao map' className={style.logo_kakaoMap_text} />
                        </div>
                        

                        <div className={style.map_search_container_2}>
                            <PlaceSearchInput onSearch={handleSearch} />
                        </div>
                        
                    </div>

                    <div className={style.map_menu_container}>

                        <ul className={style.map_menu}>
                            <li className={style.search_tap_1}>
                                <a>검색</a>
                            </li>

                            <li className={style.search_tap_2}>
                                <a href="https://map.kakao.com/link/roadview/18577297">예비</a>
                            </li>

                            <li className={style.search_tap_3}>
                                <a>MY</a>
                            </li>
                        </ul>
                    </div>

                    <div className={style.mapMode_container}>
                        <p className={style.mapMode_title}>지도 모드</p>
                        <div>
                            <ChangeMapType />
                        </div>
                        <hr className={style.hr_1}></hr>
                    </div>
                </div>

                <div className={style.search_list_container}>
                    <PlaceSearchResults keyword={searchKeyword} />
                </div>

                <div className={style.category_container}>
                    <p className={style.mapMode_title}>카테고리</p>
                    <div>
                        <CategorySearch />
                    </div>
                    <hr className={style.hr_1}></hr>
                </div>

                <div className={style.map_display}>
                    <KakaoMap setLevel={setLevel} />
                </div>
                
            </div>
            
        </div>
    );
    
}

export default MapPage;