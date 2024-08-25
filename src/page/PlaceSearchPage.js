import React from 'react';
import PlaceSearchResults from '../component/PlaceSearchResults';
import ChangeMapType from '../component/ChangeMapType';
import CategorySearch from '../component/CategorySearch';

import style from '../page/PlaceSearchPage.module.scss'

function PlaceSearchPage({ searchKeyword, handleSearch }) {
    return (
        <div>

            <div className={style.mapMode_container}>
                <p className={style.mapMode_title}>지도 모드</p>
                <div>
                    <ChangeMapType />
                </div>
                <hr className={style.hr_1}></hr>
            </div>

            <div className={style.category_container}>
                <p className={style.mapMode_title}>카테고리</p>
                <div>
                    <CategorySearch />
                </div>
                <hr className={style.hr_2}></hr>
            </div>

            <div className={style.search_list_container}>
                <p className={style.mapMode_title}>검색 결과</p>
                <div>
                    <PlaceSearchResults keyword={searchKeyword} />
                </div>
                
            </div>
            
        </div>
    );
}

export default PlaceSearchPage;
