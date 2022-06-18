/**
 * Throws a 401 status.
 * @param message The error message to throw for the unauthorized error.
 */
export class UnauthorizedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
  }
}
