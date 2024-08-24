import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useMemoStore = create(
    persist(
        (set) => ({
            memos: [],
            addMemo: (title, memo, lat, lng) => set((state) => ({
                memos: [...state.memos, { title, memo, lat, lng }],
            })),
            removeMemo: (lat, lng) => set((state) => ({
                memos: state.memos.filter(
                    (memo) => memo.lat !== lat || memo.lng !== lng
                ),
            })),
            clearMemos: () => set({ memos: [] }),
        }),
        {
            name: 'memo-storage',
            getStorage: () => localStorage,
        }
    )
);

export default useMemoStore;
