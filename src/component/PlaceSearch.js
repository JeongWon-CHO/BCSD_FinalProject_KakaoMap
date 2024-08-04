import React, { useState, useEffect } from 'react';
import { getMap } from '../utils/KakaoMapApi';
import search_img from '../img/search-icon.png';
import style from './PlaceSearch.module.scss'; // 스타일 파일은 필요에 따라 수정

function PlaceSearch() {
  const [keyword, setKeyword] = useState(''); // State for the input value
  const [places, setPlaces] = useState([]); // 검색 결과 저장
  const [pagination, setPagination] = useState(null); // 페이지네이션 정보 저장
  const [markers, setMarkers] = useState([]); // 마커 저장

  const handleSearch = () => {
    const map = getMap();
    if (!map) {
      console.error("지도가 없습니다!");
      return;
    }

    // Create a Places search object
    const ps = new window.kakao.maps.services.Places();

    // Use the keyword to search for places
    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === window.kakao.maps.services.Status.OK) {

        setPlaces(data); // 검색 결과를 상태로 저장
        setPagination(pagination); // 페이지네이션 정보 저장

        // Adjust map bounds based on search results
        const bounds = new window.kakao.maps.LatLngBounds();

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i], map);
          bounds.extend(new window.kakao.maps.LatLng(data[i].y, data[i].x));
        }

        map.setBounds(bounds);
      } else if (status === window.kakao.maps.services.Status.ZERO_RESULT) {
        alert('검색 결과가 존재하지 않습니다.');
      } else if (status === window.kakao.maps.services.Status.ERROR) {
        alert('검색 결과 중 오류가 발생했습니다.');
      }
    });
  };

  const displayMarker = (place, map) => {
    // Create an InfoWindow to display place names
    const infowindow = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    // Create a marker and display it on the map
    const marker = new window.kakao.maps.Marker({
      map: map,
      position: new window.kakao.maps.LatLng(place.y, place.x),
    });

    // Add a click event listener to the marker
    window.kakao.maps.event.addListener(marker, 'click', function () {
      // Show place name in the InfoWindow when marker is clicked
      infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
      infowindow.open(map, marker);
    });

    return marker;

  };

  useEffect(() => {
    const map = getMap();
    if (!map) return;

    // 기존 마커 제거
    markers.forEach(marker => marker.setMap(null));

    const newMarkers = places.map(place => displayMarker(place, map));
    setMarkers(newMarkers);
  }, [places]);

  const handlePageClick = (page) => {
    pagination.gotoPage(page);
  };

  return (

    <div>
      <div className={style.map_search_container}>
        <input
          className={style.map_searchBox}
          placeholder="장소, 주소 검색"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)} // Update state with input value
        />
        <button className={style.btn_container} onClick={handleSearch}> {/* Bind handleSearch to the button */}
          <img src={search_img} alt='검색' className={style.search_icon} />
        </button>
      </div>

      <ul className={style.placesList}>
        {places.map((place, index) => (
          <li key={index} className={style.listItem}>
            <div className={style.info}>
              <h5>{place.place_name}</h5>
              {place.road_address_name ? (
                <span>{place.road_address_name}</span>
              ) : (
                <span>{place.address_name}</span>
              )}
            <span className={style.tel}>{place.phone}</span>
          </div>
        </li>
      ))}
      </ul>

      <div id="pagination" className={style.pagination}>
      {pagination && Array.from({ length: pagination.last }).map((_, index) => (
        <a
          key={index}
          href="#"
          className={pagination.current === index + 1 ? style.on : ''}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </a>
      ))}
      </div>
    </div>


  );
}

export default PlaceSearch;