import {Router} from "express"

const interviewRouter = Router()



import authUserMiddleware from "../middlewares/auth.middleware.js"
import validateMiddleware from "../middlewares/validate.middleware.js"
import interviewController from "../controllers/interview.controller.js"
import { interviewInputSchema } from "../schemas/interview.validator.js";

import upload from "../middlewares/file.middleware.js";






/**
 * @route POST /api/interview/generate
 * @description Generate interview report on the basis of user's resume pdf, self description and job description
 * @access Private
 */
interviewRouter.post("/generate", authUserMiddleware,upload.single("resume"), interviewController.generateInterviewReportController)

/**
 * @route GET /api/interview
 * @description Get all interview reports of a user
 * @access Private
 */
interviewRouter.get("/all", authUserMiddleware, interviewController.getUserAllInterviewReportController)

/**
 * @route GET /api/interview/:id
 * @description Get interview report by user id
 * @access Private
 */
interviewRouter.get("/:id", authUserMiddleware, interviewController.getInterviewReportByIdController)

export default interviewRouter