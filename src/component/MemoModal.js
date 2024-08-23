import React, { useState } from 'react';
import style from './MemoModal.module.scss';

function MemoModal({ onClose, onSave }) {
    const [memo, setMemo] = useState('');

    const handleSave = () => {
        onSave(memo);
        onClose();
    };

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="메모를 입력하세요"
                />
                <div className={style.modalActions}>
                    <button onClick={handleSave}>저장</button>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}

export default MemoModal;
