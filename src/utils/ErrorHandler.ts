class ErrorHandler extends Error {
  public statusCode: number;
  public success: boolean;

  constructor({
    status,
    message,
    success,
  }: {
    success?: boolean;
    status?: number;
    message?: string;
  }) {
    super(message);
    this.statusCode = status || 500;
    this.success = success ?? false;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
