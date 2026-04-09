const {Router} = require("express")

const authRouter = Router()

const authController = require("../controllers/auth.controller") 

const authUserMiddleware = require("../middlewares/auth.middleware")




/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */

authRouter.post("/register", authController.registerUserController)

/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access Public
 */

authRouter.post("/login", authController.loginUserController)

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



module.exports= authRouter