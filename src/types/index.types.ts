import { Document } from "mongoose";



// Auth Types
export type AuthModelType = Document & {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  number: number;
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
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountPrice: number;
  bathrooms: number;
  bedrooms: number;
  furnished: boolean;
  parking: boolean;
  type: string;
  offer: boolean;
  imageUrls: string[];
  userRef: string;
  createdAt?: Date;
  updatedAt?: Date;
};



// Try Catch Error Type
export type MongodbError = {
  errorResponse: {
    index: number;
    code: number;
    errmsg: string;
    [key: string]: any;
  },
  keyPattern: {
    [key: string]: any;
  },
  keyValue: {
    [key: string]: any;
  }
}
