import React, { useState } from 'react';
import style from './MemoModal.module.scss';

function MemoModal({ onClose, onSave }) {
    const [memo, setMemo] = useState('');

    const handleSave = () => {
        onSave(memo);
        onClose();
        alert("저장되었습니다.");
    };

    return (
        <div className={style.modalOverlay}>
            <div className={style.modalContent}>
                <textarea
                    value={memo}
                    onChange={(e) => setMemo(e.target.value)}
                    placeholder="메모를 입력하세요."
                    className={style.textareaBox}
                />
                
                <div className={style.modalActions}>
                    <div>
                        <button className={style.modalButton} onClick={handleSave}>저장</button>
                    </div>
                    
                    <div>
                        <button className={style.modalButton} onClick={onClose}>닫기</button>
                    </div>
                    
                    
                </div>
            </div>
        </div>
    );
}

export default MemoModal;
