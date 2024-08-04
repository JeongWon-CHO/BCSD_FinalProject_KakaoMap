import React, { useState } from 'react';
import KakaoMap from './component/KakaoMap';
import MapControls from './component/MapControls';
import ChangeMapType from './component/ChangeMapType';
import MarkUp from './component/MarkUp';
import Roadview from './component/Roadview';

import MapPage from './page/MapPage';


function App() {
  const [level, setLevel] = useState(3);

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
