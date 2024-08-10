import React, { useRef }from 'react';
import styles from './MainPage.module.scss';
import MainPageHeader from './MainPageHeader';
import MainPageBody1 from './MainPageBody1';
import MainPageBody2 from './MainPageBody2';

function MainPage() {

  // useRef를 사용하여 div 엘리먼트를 참조합니다.
  const element = useRef(null);

  // 버튼 클릭 시 스크롤 이동 함수
  const onMoveBox = () => {
    element.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.contents_container}>

      <MainPageHeader />
      
      <div className={styles.divCenter}>
        <p className={styles.title}>기술과 사람으로 더 나은 세상을 만듭니다.</p>
      </div>

      <div>
        <MainPageBody1 />
      </div>
      
      {/* 버튼 클릭 시 스크롤 */}
      <div className={styles.btn_container}>
        <button 
          onClick={onMoveBox}
          className={styles.scroll_btn}>
          Next
        </button>
      </div>
      

      <div className={styles.blankSpace}></div>


      <div
        ref={element}
        className="w-full h-screen relative flex flex-col"
      >
        {/* 해당 div는 스크롤의 목표 지점 */}
        <div>
          <MainPageBody2 />
        </div>
        
      </div>

      <div className={styles.btn_container}>
        <button 
          className={styles.scroll_btn}>
          시작하기
        </button>
      </div>

      <div className={styles.blankSpace}></div>

    </div>
  );
}

export default MainPage;