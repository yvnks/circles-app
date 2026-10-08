// import path from "path";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import hpp from "hpp";
import connectDatabase from "./helpers/dbConnect.js";
import "dotenv/config";
import userRoutes from "./routes/user.routes.js";
import errHandler from "./middleware/customErrHandler.js";

const app = express();

// setup middleware;
app.use(helmet());
app.use(cors());
app.use(cookieParser());
app.use(hpp());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// mount routes
app.use("/api/v1/users", userRoutes);

app.use(errHandler);

let port = process.env.PORT || 3000;

const startApp = async () => {
  try {
    await connectDatabase();

    const server = app.listen(port, () => {
      console.log(
        `Server started in ${process.env.NODE_ENV} mode on port: ${port}\nVisit http://localhost:${port}`,
      );
    });

    process.on("unhandledRejection", (err, promise) => {
      console.log(err.message);
      server.close();
    });
  } catch (error) {
    console.log(error);
  }
};

startApp();
