import CustomErrorHandler from "../helpers/customErrorHandler.js";

const errHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Bad objectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = new CustomErrorHandler(message, 404);
  }

  if (err.code === 11000) {
    const message = "Duplicate fields";
    error = new CustomErrorHandler(message, 400);
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((err) => {
      return err.message;
    });
    error = new CustomErrorHandler(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
};

export default errHandler;
