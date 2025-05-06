import { NextFunction, Request, Response } from "express";

export class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = "AppError";
  }
}

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      error: err.message,
      details: err.details,
    });
  }

  // Handle database errors
  if (err.name === "PostgresError") {
    return res.status(400).json({
      error: "Database error",
      details: err.message,
    });
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation error",
      details: err.message,
    });
  }

  // Default error
  return res.status(500).json({
    error: "Internal server error",
    details: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
