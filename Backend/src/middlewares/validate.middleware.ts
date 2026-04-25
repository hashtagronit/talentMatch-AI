import { ZodType, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

const validate = <T>(schema: ZodType<T>) => (req: Request, res: Response, next: NextFunction): void => {
    try {
      const parsedData = schema.parse(req.body);

      req.validatedBody = parsedData;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          message: "Validation failed",
          errors: error.issues,
        });
        return;
      }

      res.status(500).json({
        message: "Internal server error",
      });
    }
  };

export default validate