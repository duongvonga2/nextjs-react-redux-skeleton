export const saveData = <T extends Record<string, any>>(
  itemName: "appUser",
  data: T
): void => {
  localStorage.setItem(itemName, JSON.stringify(data));
};

export const getData = <T extends Record<string, any>>(
  itemName: "appUser"
): T | null => {
  const storageData = localStorage.getItem(itemName);
  if (storageData) {
    return JSON.parse(storageData);
  }
  return null;
};

export const removeData = (itemName: "appUser") => {
  localStorage.removeItem(itemName);
};
