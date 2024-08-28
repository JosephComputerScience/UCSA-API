/**
 * Returns true if the time is less than the amountOfTime passed. 1000 ms = 1s.
 * @param time - Timestamp to compare to Date.now(), time should be epoch in ms
 * @param amountOfTime Amount of time to verify in ms.
 * @returns {boolean} Whether the amountOfTime has passed.
 */
export const hasTimeElapsed = (time: number, amountOfTime: number): boolean =>
  Date.now() - time > amountOfTime;
