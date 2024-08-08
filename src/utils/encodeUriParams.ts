export const encodeUriParams = (params: { [key: string]: string }) => {
  const keys = Object.keys(params);
  const encodedParams: string[] = [];
  keys.forEach((key) =>
    encodedParams.push(`${key}=${encodeURIComponent(params[key])}`)
  );
  return encodedParams.join('&');
};
