import { NextFunction, Request, Response } from "express";


export const signUpController = (req: Request, res: Response, next: NextFunction) => {
res.json({Message: "Sign Up Controller"})
}


export const signInController = (req: Request, res: Response, next: NextFunction) => {

}


export const googleAuthController = (req: Request, res: Response, next: NextFunction) => {

}


export const forgetPasswordController = (req: Request, res: Response, next: NextFunction) => {

}


export const signOutController = (req: Request, res: Response, next: NextFunction) => {

}
