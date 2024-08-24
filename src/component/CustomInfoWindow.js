import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import InfoWindowContent from './InfoWindowContent';

const CustomInfoWindow = ({ map, position, message, onWriteMemo, onLike, onClose }) => {
    useEffect(() => {
        if (!map || !position) return;

        const infoWindowDiv = document.createElement('div');
        const root = createRoot(infoWindowDiv);

        const renderInfoWindow = () => {
            root.render(
                <InfoWindowContent
                    message={message}
                    onWriteMemo={onWriteMemo}
                    onLike={onLike}
                    onClose={() => {
                        infoWindowDiv.style.display = 'none';
                        onClose();
                    }}
                />
            );

            // 인포윈도우 위치 설정
            const projection = map.getProjection();
            const point = projection.containerPointFromCoords(position);

            infoWindowDiv.style.position = 'absolute';
            infoWindowDiv.style.left = `${point.x}px`;
            infoWindowDiv.style.top = `${point.y}px`;
            infoWindowDiv.style.transform = 'translate(-50%, -100%)';
            infoWindowDiv.style.zIndex = 3;
        };

        renderInfoWindow();

        map.getNode().appendChild(infoWindowDiv);

        const handleMapUpdate = () => {
            // 지도 이동이나 확대/축소 시 인포윈도우 위치를 업데이트
            renderInfoWindow();
        };

        // 지도 이벤트 핸들러 등록
        map.on('zoom_changed', handleMapUpdate);
        map.on('center_changed', handleMapUpdate);

        return () => {
            map.getNode().removeChild(infoWindowDiv);
            root.unmount();
            map.off('zoom_changed', handleMapUpdate);
            map.off('center_changed', handleMapUpdate);
        };
    }, [map, position, message, onWriteMemo, onLike, onClose]);

    return null;
};

export default CustomInfoWindow;
