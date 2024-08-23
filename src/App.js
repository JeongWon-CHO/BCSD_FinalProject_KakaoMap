import React, { useState } from 'react';
import KakaoMap from './component/KakaoMap';
import MapControls from './component/MapControls';
import ChangeMapType from './component/ChangeMapType';
import MarkUp from './component/MarkUp';
import Roadview from './component/Roadview';

import MapPage from './page/MapPage';

import MainPage from './page/MainPage';


function App() {
  const [level, setLevel] = useState(3);

  /* 
  return (
    <div>
      <MainPage />
    </div>
  )
  */

  
  return (
    <div>
      <MapPage />
      <div>
        <MarkUp />
      </div>
    </div>
  );
  
}


export default App;
