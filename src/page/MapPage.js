import React, { useState } from 'react';
import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import PlaceSearchPage from '../page/PlaceSearchPage';
import FavoritePage from './FavoritePage';
import MyPage from '../page/MyPage';
import KakaoMap from '../component/KakaoMap';
import style from './MapPage.module.scss';
import logo_kakao from '../img/logo_kakaomap_en.png';
import PlaceSearchInput from '../component/PlaceSearchInput';
import MarkUp from '../component/MarkUp';
import Roadview from '../component/Roadview';

function MapPage() {
    const [level, setLevel] = useState(3);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [roadviewVisible, setRoadviewVisible] = useState(false);
    const [markersVisible, setMarkersVisible] = useState(true);
    const navigate = useNavigate();

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
        <div className={style.map_page}>
            <div className={style.map_container}>
                <div className={style.side_header}>
                <div className={style.logo_container}>
                        <img 
                            src={logo_kakao} 
                            alt='kakao map' 
                            className={style.logo_kakaoMap_text} 
                            onClick={() => navigate('/')} // 이미지 클릭 시 루트 페이지로 이동
                            style={{ cursor: 'pointer' }} // 클릭 가능한 아이콘처럼 커서 변경
                        />
                    </div>
                    <div className={style.input_container}>
                        <PlaceSearchInput onSearch={handleSearch} />
                    </div>
                    <div className={style.map_menu_container}>
                        <ul className={style.map_menu}>
                            <li className={style.menu_tap_1}>
                                <NavLink to="/map/search" className={style.navBar}>검색</NavLink>
                            </li>
                            <li className={style.menu_tap_2}>
                                <NavLink to="/map/directions" className={style.navBar}>즐겨찾기</NavLink>
                            </li>
                            <li className={style.menu_tap_3}>
                                <NavLink to="/map/my" className={style.navBar}>기록</NavLink>
                            </li>
                        </ul>
                    </div>
                    <div className={style.content_container}>
                        <Routes>
                            <Route path="search" element={<PlaceSearchPage searchKeyword={searchKeyword} handleSearch={handleSearch} />} />
                            <Route path="directions" element={<FavoritePage />} />
                            <Route path="my" element={<MyPage />} />
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
    );
}

export default MapPage;
