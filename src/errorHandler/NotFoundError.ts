/**
 * Throws a 404 status.
 * @param message The error message to throw for the not found error.
 */
export class NotFoundError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
