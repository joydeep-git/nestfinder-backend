import {Document, ObjectId} from "mongoose";


// Auth Types
export type AuthModelType = Document & {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  number: number;
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
};


// User Authentication Data return types
export type UserDetailsType = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  number: number;
  password?: string;
  avatar: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: string | ObjectId | unknown;
  __v: number;
};


export type UserDataType = {
  _id: number;
  _doc: UserDetailsType;
  [key: string]: any;
}


// User Types
export type UserModelType = Document & {
  firstName: string;
  lastName: string;
  number: number;
  username: string;
  email: string;
  password: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
};



// Property Types
export type ProductModelType = Document & {
  name: string;
  description: string;
  address: string;
  regularPrice: number;
  discountAmount: number;
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


export interface JwtDecodeType {
  id: string;
  iat: number;
}