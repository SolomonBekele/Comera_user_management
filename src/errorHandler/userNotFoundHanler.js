export default class UserNotFoundError extends Error {
  constructor(message = "Book Not Found") {
    super(message);
    this.name = "BookNotFoundError";
    this.statusCode = 404;
    this.timestamp = new Date().toISOString();
  }
}