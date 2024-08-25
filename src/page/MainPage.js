import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.scss';
import MainPageHeader from './MainPageHeader';
import MainPageBody1 from './MainPageBody1';
import MainPageBody2 from './MainPageBody2';

function MainPage() {
  const element = useRef(null);
  const navigate = useNavigate();

  const onMoveBox = () => {
    element.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleStartClick = () => {
    navigate('/map'); // MapPage로 이동
  };

  return (
    <div className={styles.contents_container}>
      <MainPageHeader />
      <div className={styles.divCenter}>
      </div>
      <div>
        <MainPageBody1 />
      </div>
      <div className={styles.btn_container}>
        <button onClick={onMoveBox} className={styles.scroll_btn}>
          Next
        </button>
      </div>
      <div className={styles.blankSpace}></div>
      <div ref={element} className="w-full h-screen relative flex flex-col">
        <div>
          <MainPageBody2 />
        </div>
      </div>
      <div className={styles.btn_container}>
        <button onClick={handleStartClick} className={styles.scroll_btn}>
          시작하기
        </button>
      </div>
      <div className={styles.blankSpace}></div>
    </div>
  );
}

export default MainPage;
