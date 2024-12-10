import ErrorHandler from "./ErrorHandler";

export const mongooseErrorHandler = (err: any) => {

  const key = Object.keys(err.keyPattern)[0];

  return new ErrorHandler({
    status: 400,
    message: `${key.charAt(0).toUpperCase() + key.slice(1, key.length) } already registered!`,
  })

};
