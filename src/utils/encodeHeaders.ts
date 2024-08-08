export const encodeHeaders = (headers: { [key: string]: string }) => {
  for (const [key, value] of Object.entries(headers)) {
    headers[key] = encodeURIComponent(value);
  }
};
