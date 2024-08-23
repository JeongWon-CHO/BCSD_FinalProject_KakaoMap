import React from 'react';
import style from './InfoWindowContent.module.scss';

const InfoWindowContent = ({ message, onWriteMemo, onLike, onClose }) => {
    return (
        <div className={style.infowindow}>
        <div>{message}</div>
        <br />
        <button onClick={onWriteMemo}>
            글쓰기
        </button>
        <button onClick={onLike}>
            좋아요
        </button>
        </div>
    );
};

/*
<button onClick={onClose}>
            닫기
        </button>
*/

export default InfoWindowContent;
