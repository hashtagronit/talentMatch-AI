import { Request, JwtPayload } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user?: {
      id: string;
    };
  }
}

declare module "express-serve-static-core" {
  interface Request {
    validatedBody?: unknown;
  }
}


export interface CustomJwtPayload extends JwtPayload {
  id: string;
  exp?: number;
  iat?: number;
}

