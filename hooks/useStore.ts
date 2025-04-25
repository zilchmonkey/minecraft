import { create } from "zustand";
import { nanoid } from "nanoid";

type Cube = {
  key: string;
  pos: [number, number, number];
  texture: string;
};

type Store = {
  texture: string;
  cubes: Cube[];
  addCube: (x: number, y: number, z: number) => void;
  removeCube: (x: number, y: number, z: number) => void;
  setTexture: (texture: string) => void;
  saveWorld: () => void;
  resetWorld: () => void;
};

const getLocalStorage = (key: string): Cube[] | null => {
  const item = window.localStorage.getItem(key);
  return item ? JSON.parse(item) : null;
};

const setLocalStorage = (key: string, value: unknown): void =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create<Store>((set) => ({
  texture: "dirt",
  cubes: getLocalStorage("cubes") || [],
  addCube: (x: number, y: number, z: number) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        { key: nanoid(), pos: [x, y, z], texture: prev.texture },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter((cube) => {
        const [X, Y, Z] = cube.pos;
        return X !== x || Y !== y || Z !== z;
      }),
    }));
  },
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  saveWorld: () => {
    set((prev) => {
      setLocalStorage("cubes", prev.cubes);
      return prev;
    });
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));
