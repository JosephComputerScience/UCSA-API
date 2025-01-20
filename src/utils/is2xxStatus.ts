/**
 * Returns true if status is 2xx and false for any other status
 * @param status - status code
 * @returns {boolean} true if 2xx else false
 */
export const is2xxStatus = (status: number): boolean =>
  status > 199 && status < 300;
