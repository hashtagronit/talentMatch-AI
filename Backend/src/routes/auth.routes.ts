import {Router} from "express"

const authRouter = Router()

import authController from "../controllers/auth.controller.js"

import authUserMiddleware from "../middlewares/auth.middleware.js"
import validateMiddleware from "../middlewares/validate.middleware.js"

import { signInInputSchema, signUpInputSchema } from "../schemas/auth.validator.js";




/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register", validateMiddleware(signUpInputSchema), authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access Public
 */

authRouter.post("/login", validateMiddleware(signInInputSchema), authController.loginUserController)

/**
 * @route POST /api/auth/logout
 * @description Logout user
 * @access Private
 */

authRouter.post("/logout", authUserMiddleware, authController.logoutUserController)

/**
 * @route GET /api/auth/userProfile
 * @description Get current user data
 * @access Private
 */

authRouter.get("/userProfile", authUserMiddleware,authController.userProfileController)

export default authRouter