// src/utils/KakaoMapApi.js

let mapInitialized = false;
const mapReadyCallbacks = [];

export const InitializeMap = async (setLevel) => {
  try {
    if (!window.kakao || !window.kakao.maps) {
      throw new Error('Kakao Maps API가 로드되지 않았습니다.');
    }

    window.kakao.maps.load(() => {
      const kakaoMaps = window.kakao.maps;
      const mapContainer = document.getElementById("map");
      if (!mapContainer) {
        console.error("지도를 표시할 DOM 요소를 찾을 수 없습니다.");
        return;
      }

      const mapOption = {
        center: new kakaoMaps.LatLng(33.450701, 126.570667),
        level: 3,
      };

      const map = new kakaoMaps.Map(mapContainer, mapOption);
      const mapTypeControl = new kakaoMaps.MapTypeControl();
      const zoomControl = new kakaoMaps.ZoomControl();

      map.addControl(mapTypeControl, kakaoMaps.ControlPosition.TOPRIGHT);
      map.addControl(zoomControl, kakaoMaps.ControlPosition.RIGHT);

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const locPosition = new kakaoMaps.LatLng(lat, lon);

          const marker = new kakaoMaps.Marker({
            position: locPosition,
            map: map,
          });

          map.setCenter(locPosition);
        });
      } else {
        const locPosition = new kakaoMaps.LatLng(33.450701, 126.570667);
        map.setCenter(locPosition);
      }

      kakaoMaps.event.addListener(map, "zoom_changed", () => {
        const level = map.getLevel();
        setLevel(level);
      });

      window.map = map; // 전역 변수로 설정하여 getMap에서 접근 가능하도록 설정
      mapInitialized = true;
      mapReadyCallbacks.forEach(callback => callback());
      console.log("지도 초기화 완료");
    });
  } catch (error) {
    console.error("지도 초기화 중 오류 발생:", error);
  }
};

export const getMap = () => {
  if (!window.map) {
    console.error('지도는 아직 초기화되지 않았습니다.');
    return null;
  }
  
  return window.map;
};

export const onMapReady = (callback) => {
  if (mapInitialized) {
    callback();
  } else {
    mapReadyCallbacks.push(callback);
  }
};

export const ZoomIn = () => {
  const map = getMap();
  if (map) {
    const level = map.getLevel();
    map.setLevel(level - 1);
  }
};

export const ZoomOut = () => {
  const map = getMap();
  if (map) {
    const level = map.getLevel();
    map.setLevel(level + 1);
  }
};
