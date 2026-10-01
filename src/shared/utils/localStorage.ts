export const saveToLocalStorage = (key: string, payload: unknown) => {
  try {
    const raw = JSON.stringify(payload);
    localStorage.setItem(key, raw);
  } catch {
    void 0;
  }
};

export const getFromLocalStorage = <T = unknown>(key: string): T | null => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
};

export const removeFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key);
  } catch {
    void 0;
  }
};
