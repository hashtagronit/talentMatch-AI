const jwt = require("jsonwebtoken")
const { redisClient } = require("../config/database")

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
};

/**
 * @name authUserMiddleware
 * @description Protects routes by verifying the JWT token
 * @access Private
 */

async function authUserMiddleware(req, res, next) {
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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        return res.status(401).json({ message: "Unauthorized" });
    }
}

module.exports = authUserMiddleware