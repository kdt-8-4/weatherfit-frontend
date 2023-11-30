export function saveToLocalStorage(key: any, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadFromLocalStorage(key: any, defaultValue: any) {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValue;
  }
  return defaultValue;
}
