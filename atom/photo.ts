import { create } from "zustand";

export interface PhotoStore {
  photos: File[];
  setPhotos: (photos: File[]) => void;
  getSinglePhoto: () => File | null;
}

export const usePhotoStore = create<PhotoStore>((set, get) => ({
  photos: [] as File[],
  setPhotos: (photos: File[]) => set({ photos }),
  getSinglePhoto: () => get().photos[0],
}));
