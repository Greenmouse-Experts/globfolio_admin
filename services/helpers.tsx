import { store } from "@/shared/redux/store";


export const requestAuthorization = () => {
    const appState = store.getState();
    return appState && appState.user && appState.user.user
      ? `Bearer ${appState.user.user.token}`
      : "";
  };

export const storeLocalToken = (key: string, data: any) => {
    if (typeof window !== "undefined") {
        window.localStorage.setItem(key, JSON.stringify(data));
      }
}

export const getLocalToken = (key: string) => {
    if (typeof window !== "undefined") {
        const storageItem = window.localStorage.getItem(key);
        if (storageItem) return JSON.parse(storageItem);
        return null;
      }
      return null;
}

export const deleteFromLocalStorage = (key: string) => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem(key);
  }
};