export const encodeUriParams = (params: { [key: string]: string }) => {
  const keys = Object.keys(params);
  const encodedParams: string[] = [];
  for (const key of keys) {
    encodedParams.push(`${key}=${encodeURIComponent(params[key])}`);
  }
  return encodedParams.join("&");
};
