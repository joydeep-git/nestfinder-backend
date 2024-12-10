class ErrorHandler extends Error {

  public statusCode: number;

  constructor({ status, message }: { status?: number; message?: string }) {

    super(message);

    this.statusCode = status || 500;

    Error.captureStackTrace(this, this.constructor);

  }
}

export default ErrorHandler;
