import { StorageMethods } from "../interface/types";

const onLocalStorage: StorageMethods = {
  getData: (key) => localStorage.getItem(key),
  setData: (key) => localStorage.setItem(key, JSON.stringify(value))
}

export default onLocalStorage;