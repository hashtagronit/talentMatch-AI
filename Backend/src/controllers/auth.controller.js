const userModel = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { redisClient } = require("../config/database");

const isProduction = process.env.NODE_ENV === "production";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction, // true in production (HTTPS)
  sameSite: isProduction ? "none" : "lax", // in production sameSite should be none, and in development it can be lax
  path: "/",
};

/**
 * @name registerUserController
 * @route POST /api/auth/register
 * @description Register a new user, expects username, email, password in body
 * @access Public
 */

async function registerUserController(req, res) {
    try {
        const { username, email, password } = req.body
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const userExists = await userModel.findOne({ $or: [{ username }, { email }] })
        if (userExists) {
            if (userExists.username === username) {
                return res.status(400).json({ message: "Username already exists" })
            }
            return res.status(400).json({ message: "Email already exists" })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        })

        //here we create a token for the user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

        //here we set the token in the cookie
        res.cookie("token", token, cookieOptions)

        res.status(201).json({
            message: "User registered successfully", user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

/**
 * @name loginUserController
 * @route POST /api/auth/login
 * @description Login a user, expects email and password in body
 * @access Public
 */

async function loginUserController(req, res) {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" })
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" })
        }

        //here we create a token for the user
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
        //here we set the token in the cookie
        res.cookie("token", token, cookieOptions)
        res.status(200).json({
            message: "User logged in successfully", user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

/**
 * @name logoutUserController
 * @route POST /api/auth/logout
 * @description Logout user
 * @access Private
 */
async function logoutUserController(req, res) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(200).json({ message: "Already logged out" });
        }

        //here we decode the token to get the expiry time
        let decoded;   //we have declared it outside the try block so that it is accessible outside the try block
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            //if the token is invalid or expired, we clear the token from the cookie and return
            res.clearCookie("token", cookieOptions);
            return res.status(200).json({ message: "Logged out" });
        }

        const currentTime = Math.floor(Date.now() / 1000);
        const timeRemaining = decoded.exp - currentTime;

        //here we add the token to the blacklist if not expired
        if (timeRemaining > 0) {
            await redisClient.set(`blacklist:${token}`, "blacklisted", {
                EX: timeRemaining,
            });
        }

        //here we clear the token from the cookie, with the same options as when we set it
        res.clearCookie("token", cookieOptions);

        return res.status(200).json({
            message: "User logged out successfully",
        });

    } catch (error) {
        console.error("Logout Error:", error);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
}


/**
 * @name userProfileController
 * @route GET /api/auth/userProfile
 * @description Get current user data
 * @access Private
 */
async function userProfileController(req, res) {
    try {
        const user = await userModel.findById(req.user.id)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({
            message: "User profile fetched successfully", user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

module.exports = { registerUserController, loginUserController, logoutUserController, userProfileController }
