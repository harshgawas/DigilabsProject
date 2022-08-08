class CustomErrorHandler extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export default CustomErrorHandler;
