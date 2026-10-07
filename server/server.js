import path from "path";
import express from "express";
import { asyncHandler } from "./utils/asyncHandler.js";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import connectDatabase from "./helpers/dbConnect.js";
import "dotenv/config";

const app = express();

// setup middleware;
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(hpp());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let port = process.env.PORT || 3000;

const startApp = asyncHandler(async () => {
  await connectDatabase();

  const server = app.listen(port, () => {
    console.log(`Server started in ${process.env.NODE_ENV} on port: ${port}`);
  });

  process.on("unhandledRejection", (err, promise) => {
    console.log(err.message);
    server.close();
  });
});

startApp();
