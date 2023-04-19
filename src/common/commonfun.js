export function dateformate(string) {
  return new Date(string).toLocaleDateString("en-US");
}

export function getDataFromLocalStorage() {
  const data = localStorage.getItem("Users");
  const NewData = data ? JSON.parse(data) : [];
  return NewData;
}
