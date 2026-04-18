import { Request, JwtPayload } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
    };
  }
}


export interface CustomJwtPayload extends JwtPayload {
  id: string;
  exp?: number;
  iat?: number;
}