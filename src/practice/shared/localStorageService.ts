import { LocalStorageService } from "./types";

export const localStorageMethods: LocalStorageService = {
  getData: (key) => localStorage.getItem(key),
  setData: (key, value) => localStorage.setItem(key, JSON.stringify(value))
};