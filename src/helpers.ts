export const encodeBase64 = (username: string, password: string) => {
  return btoa(`${username}:${password}`);
};
