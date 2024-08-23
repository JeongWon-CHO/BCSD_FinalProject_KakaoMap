import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink } from 'react-router-dom';

import PlaceSearchPage from '../page/PlaceSearchPage';
import DirectionsPage from '../page/DirectionsPage';
import MyPage from '../page/MyPage';

import MapControls from '../component/MapControls';
import ChangeMapType from '../component/ChangeMapType';
import KakaoMap from '../component/KakaoMap';
import style from './MapPage.module.scss';
import search_img from '../img/search-icon.png';
import logo_kakao from '../img/logo_kakaomap_en.png';
import PlaceSearchInput from '../component/PlaceSearchInput';
import PlaceSearchResults from '../component/PlaceSearchResults';
import CategorySearch from '../component/CategorySearch';
import Roadview from '../component/Roadview';
import MarkUp from '../component/MarkUp'; // 추가한 MarkUp 컴포넌트

function MapPage() {
    const [level, setLevel] = useState(3);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [roadviewVisible, setRoadviewVisible] = useState(false);
    const [markersVisible, setMarkersVisible] = useState(true); // 마커 표시 여부 상태

    const handleSearch = (keyword) => {
        setSearchKeyword(keyword);
    };

    const toggleRoadview = () => {
        setRoadviewVisible(!roadviewVisible);
    };

    const toggleMarkers = () => {
        setMarkersVisible(!markersVisible); // 마커 On/Off 상태 변경
    };

    return (
        <Router>
            <div className={style.map_page}>
                <div className={style.map_container}>

                    <div className={style.side_header}>
                        <div className={style.logo_container}>
                            <img src={logo_kakao} alt='kakao map' className={style.logo_kakaoMap_text} />
                        </div>

                        <div>
                            <PlaceSearchInput onSearch={handleSearch} />
                        </div>

                        <div className={style.map_menu_container}>
                            <ul className={style.map_menu}>
                                <li className={style.menu_tap_1}>
                                    <NavLink to="/search" className={({ isActive }) => isActive ? style.active : undefined}>검색</NavLink>
                                </li>
                                <li className={style.menu_tap_2}>
                                    <NavLink to="/directions" className={({ isActive }) => isActive ? style.active : undefined}>길찾기</NavLink>
                                </li>
                                <li className={style.menu_tap_3}>
                                    <NavLink to="/my" className={({ isActive }) => isActive ? style.active : undefined}>MY</NavLink>
                                </li>
                            </ul>
                        </div>

                        <div className={style.content_container}>
                            <Routes>
                                <Route path="/search" element={<PlaceSearchPage searchKeyword={searchKeyword} handleSearch={handleSearch} />} />
                                <Route path="/directions" element={<DirectionsPage />} />
                                <Route path="/my" element={<MyPage />} />
                                <Route path="/" element={<PlaceSearchPage searchKeyword={searchKeyword} handleSearch={handleSearch} />} />
                            </Routes>
                        </div>

                    </div>

                    <div className={style.map_display}>
                        <KakaoMap setLevel={setLevel} />  {/* 지도 */}
                        <MarkUp markersVisible={markersVisible} /> {/* 마커 표시 상태에 따라 MarkUp 제어 */}

                        <div className={style.roadview_container}>
                            {roadviewVisible && (
                                <Roadview
                                    isVisible={roadviewVisible}
                                    setRoadviewVisible={setRoadviewVisible}
                                    className={style.roadview_size} />
                            )}
                            {!roadviewVisible && (
                                <div className={style.roadview_control_container}>
                                    <button onClick={toggleRoadview} className={style.roadview_button}>
                                        로드뷰 보기
                                    </button>

                                    <button onClick={toggleMarkers} className={style.roadview_button}>
                                        마커 {markersVisible ? "Off" : "On"}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Router>
    );
}

export default MapPage;
