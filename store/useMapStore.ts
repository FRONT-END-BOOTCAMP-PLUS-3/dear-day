import { create } from "zustand";

interface MapBounds {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
}

interface MapStore {
  bounds: MapBounds | null;
  setBounds: (bounds: MapBounds) => void;
}

export const useMapStore = create<MapStore>((set) => ({
  bounds: null,
  setBounds: (bounds) => set({ bounds }),
}));
