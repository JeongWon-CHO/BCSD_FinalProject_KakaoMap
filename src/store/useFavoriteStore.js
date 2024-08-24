import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useFavoriteStore = create(
    persist(
        (set) => ({
        favorites: [],
        addFavorite: (favorite, lat, lng) => set((state) => ({
            favorites: [...state.favorites, { favorite, lat, lng }],
        })),
        removeFavorite: (lat, lng) => set((state) => ({
            favorites: state.favorites.filter(
            (fav) => fav.lat !== lat || fav.lng !== lng
            ),
        })),
        clearFavorites: () => set({ favorites: [] }),
        }),
        {
        name: 'favorite-storage',
        getStorage: () => localStorage,
        }
    )
);

export default useFavoriteStore;