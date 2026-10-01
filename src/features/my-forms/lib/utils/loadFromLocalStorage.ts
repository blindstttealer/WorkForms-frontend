type UniversalFormLocalStorageKeys =
  | 'applicationForm'
  | 'step'
  | 'myForms'
  | 'myFormsData'
  | 'lastActiveForm';
export const loadFromLocalStorage = (keys: UniversalFormLocalStorageKeys[]) => {
  const data = {} as Record<UniversalFormLocalStorageKeys, unknown>;
  for (const key of keys) {
    const item = localStorage.getItem(key);
    if (item) {
      data[key] = JSON.parse(item);
    }
  }
  return data;
};
