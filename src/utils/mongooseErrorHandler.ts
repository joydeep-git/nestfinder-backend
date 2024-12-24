import ErrorHandler from "./ErrorHandler";

export const mongooseErrorHandler = (err: any) => {

  if (err.code === 11000) {
    const key = Object.keys(err.keyPattern)[0];
    return new ErrorHandler({
      status: 409,
      message: `${key.charAt(0).toUpperCase() + key.slice(1)} already registered!`,
    });
  }

  // Handle other Mongoose errors
  return new ErrorHandler({
    status: 500,
    message: "Database Error",
  });
};



export const credenticalTester = (val: string): string => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return "";
}