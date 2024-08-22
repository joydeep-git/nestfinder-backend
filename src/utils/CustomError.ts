class CustomError extends Error {

  statusCode: number;

  constructor(statusCode: number, msg: string) {
    
    super(msg);

    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);

  }

}