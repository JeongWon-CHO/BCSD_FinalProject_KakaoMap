import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMemoStore = create(
    persist(
        (set) => ({
        memos: [],
        addMemo: (memo, lat, lng) => set((state) => ({
            memos: [...state.memos, { memo, lat, lng }],
        })),
        clearMemos: () => set({ memos: [] }),
        }),
        {
        name: 'memo-storage', // 로컬 스토리지에 저장될 key 이름
        getStorage: () => localStorage, // 로컬 스토리지 사용
        }
    )
);

export default useMemoStore;