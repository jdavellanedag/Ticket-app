export const getLasts = async () => {
  const resp = await fetch("http://localhost:8080/lasts-tickets");
  const data = await resp.json();
  return data.lasts;
};
