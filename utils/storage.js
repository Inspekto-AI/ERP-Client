export const getLocalStorage = (key) => localStorage.getItem(key);

export const setLocalStorage = (key, token) => {
  localStorage.setItem(key, token);
};

export const removeLocalStorage = (key) => {
  localStorage.removeItem(key);
};
