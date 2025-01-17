import ErrorHandler from "./ErrorHandler";

export const mongooseErrorHandler = (err: any) => {
  if (err.code === 11000) {
    const key = Object.keys(err.keyValue)[0];
    return new ErrorHandler({
      status: 409,
      success: false,
      message: `${key.charAt(0).toUpperCase() + key.slice(1)} already exists!`,
    });
  }

  return new ErrorHandler({
    status: 500,
    success: false,
    message: "Database Error",
  });
};
