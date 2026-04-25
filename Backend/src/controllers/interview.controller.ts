import { Request, Response } from "express";
import { interviewReportModel } from "../models/interviewReport.js";
import { generateInterviewReport } from "../services/ai.service.js";
import { PDFParse } from "pdf-parse";

/**
 * @name generateInterviewReportController
 * @route POST /api/interview/generate
 * @description Generate interview report using, resume PDF or self description + job description
 * @access Private
 */

async function generateInterviewReportController(req: Request, res: Response) {
  try {
    const resumeFile = req.file;
    const { selfDescription = "", jobDescription } = req.body;

    if (!jobDescription?.trim()) {
      return res.status(400).json({
        message: "Job description is required",
      });
    }

    if (!resumeFile && !selfDescription.trim()) {
      return res.status(400).json({
        message: "Either resume file or self description is required",
      });
    }

    let resumeText = "";

    if (resumeFile) {
      try {
        const parser = new PDFParse({ data: resumeFile.buffer });
        const result = await parser.getText();
        let resumeText = result.text || "";
        resumeText = resumeText  //cleaning the text
          .replace(/\s+/g, " ")   //replace multiple spaces with single space
          .replace(/\n+/g, " ")  //replace multiple new lines with single new line
          .trim();

        if (!resumeText) {
          return res.status(400).json({
            message: "Could not extract meaningful text from resume",
          });
        }
      } catch (err) {
        console.error("PDF parsing error:", err);
        return res.status(400).json({
          message: "Failed to parse resume PDF",
        });
      }
    }

    let interviewReportByAI;

    try {
      interviewReportByAI = await generateInterviewReport(
        resumeText,
        selfDescription,
        jobDescription
      );

      if (!interviewReportByAI) {
        throw new Error("Empty AI response");
    
      }
    } catch (err) {
      console.error("AI error:", err);

      return res.status(500).json({
        message: "Failed to generate interview report",
      });
    }

    const interviewReport = await interviewReportModel.create({
      user: req.user?.id,
      resume: resumeText,
      selfDescription,
      jobDescription,
      ...interviewReportByAI,
    });

    return res.status(201).json({
      message: "Interview report generated successfully",
      interviewReport,
    });

  } catch (error) {
    console.error("Controller error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}


/**
 * @name getInterviewReportByIdController
 * @route GET /api/interview/:id
 * @description Get interview report by ID
 * @access Private
 */
async function getInterviewReportByIdController(req: Request, res: Response) {
  try {
    const interviewReport = await interviewReportModel.findById(req.params.id);

    if (!interviewReport) {
      return res.status(404).json({
        message: "Interview report not found",
      });
    }

    return res.status(200).json({
      message: "Interview report fetched successfully",
      interviewReport,
    });

  } catch (error) {
    console.error("Controller error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}


/**
 * @name getUserAllInterviewReportController
 * @route GET /api/interview
 * @description Get all interview reports of a user
 * @access Private
 */
async function getUserAllInterviewReportController(req: Request, res: Response) {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const interviewReports = await interviewReportModel
      .find({ user: userId })
      .sort({ createdAt: -1 })
      .select("title matchScore atsScore createdAt")
      .skip(skip)
      .limit(limit);

    if (interviewReports.length === 0) {
      return res.status(200).json({
        message: "No interview reports found",
        interviewReports: [],
      });
    }

    return res.status(200).json({
      message: "Interview reports fetched successfully",
      interviewReports,
      page,
      limit,
    });

  } catch (error) {
    console.error("Controller error:", error);

    return res.status(500).json({
      message: "Internal server error",
    });
  }
}



export default { generateInterviewReportController, getInterviewReportByIdController, getUserAllInterviewReportController };