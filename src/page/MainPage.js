import React from 'react';
import styles from './MainPage.module.scss';

function MainPage() {
  return (
    <div>
      <header className={styles.headerBlock}>
        <span className={styles.logoLeft}>kakao</span>
        <nav className={styles.navTag}>
          <ul className={styles.ulNav}>
            <li><a href="#">소개</a></li>
            <li><a href="#">이야기</a></li>
            <li><a href="#">지도</a></li>
            <li><a href="#">마이페이지</a></li>
          </ul>
        </nav>
      </header>
      
      <div className={styles.divCenter}>
        <p className={styles.title}>기술과 사람으로 더 나은 세상을 만듭니다.</p>
      </div>

      <div className={styles.divCenter}>
        <span className={styles.boxBackground}></span>
        <span className={styles.boxBackground}></span>
        <span className={styles.boxBackground}></span>
      </div>
    </div>
  );
}

export default MainPage;