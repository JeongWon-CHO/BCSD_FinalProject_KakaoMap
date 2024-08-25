import React, { useState } from 'react';
import search_img from '../img/search-icon.png';
import style from '../component/PlaceSearchInput.module.scss';

function PlaceSearchInput({ onSearch }) {
    
    const [keyword, setKeyword] = useState('');

    const handleInputChange = (e) => {
        setKeyword(e.target.value);
    };

    const handleSearchClick = () => {
        onSearch(keyword);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearchClick();
        }
    };

    return (
        <div className={style.searchContainer}>
        <input
            type="text"
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="장소, 주소 검색"
            className={style.searchBox}
        />
        <button className={style.searchButton} onClick={handleSearchClick}>
            <img src={search_img} alt='검색' className={style.search_icon} />
        </button>

        </div>
    );
}

export default PlaceSearchInput;
