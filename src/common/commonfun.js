export function dateformate(string) {
  return new Date(string).toLocaleDateString("en-US");
}

export function getDataFromLocalStorage(key) {
  const data = localStorage.getItem(key);
  const NewData = data ? JSON.parse(data) : [];
  return NewData;
}

export function setDataToLocalStorage(data, key) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function isUserAuthenticate() {
  const data = getDataFromLocalStorage("Auth_Key");
  if (data.length !== 0) {
    return true;
  } else {
    return false;
  }
}
