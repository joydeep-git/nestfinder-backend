import { Document } from "mongoose";



// Auth Types
export type AuthModelType = Document & {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
};


// User Types
export type UserModelType = Document & {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
};



// Property Types
export type PropertyModelType = Document & {
  username: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
};