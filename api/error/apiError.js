class ApiError extends Error {
  status;
  errors;
  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static badRequest(message) {
    return new ApiError(400, message);
  }
  static unauthorizedError(message) {
    return new ApiError(401, message);
  }

  static forbiden(message, errors = []) {
    return new ApiError(403, message, errors);
  }
  static conflict(message, errors = []) {
    return new ApiError(409, message, errors);
  }
}

export default ApiError;
