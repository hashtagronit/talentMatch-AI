import jwt from "jsonwebtoken"
import { redisClient } from "../config/database.js"
import { Request, Response, NextFunction } from "express";
import { CustomJwtPayload } from "../types/express/index.js";



/**
 * @name authUserMiddleware
 * @description Protects routes by verifying the JWT token
 * @access Private
 */

async function authUserMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        //here we check if the token is in the blacklist
        const isBlacklisted = await redisClient.get(`blacklist:${token}`);
        if (isBlacklisted) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        //here we verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as CustomJwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

export default authUserMiddleware