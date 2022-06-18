/**
 * Throws a 400 status.
 * @param message The error message to throw for the bad request error.
 */
export class BadRequestError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BadRequestError';
  }
}
