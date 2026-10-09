import CustomErrorHandlerAPI from "../helpers/customErrorHandlerApi.js";
import User from "../model/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import dayjs from "dayjs";
import { expressjwt } from "express-jwt";

export const signin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new CustomErrorHandlerAPI("Invalid credentials", 401));
  }

  // check if the user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new CustomErrorHandlerAPI("User not found", 401));
  }

  const isTrue = await user.authenticate(password);

  if (!isTrue) {
    return next(new CustomErrorHandlerAPI("Invalid password", 401));
  }

  sendTokenResponse(user, 200, res);
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();

  const options = {
    expiresIn: dayjs().add(process.env.JWT_COOKIE_EXPIRE, "day").toDate(),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === "production") {
    options.secure = true;
  }

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
  });
};

export const signout = (req, res) => {
  res.clearCookie("token");

  return res.status(200).json({
    success: true,
    message: "Signed out",
  });
};

export const requireSignin = expressjwt({
  secret: process.env.JWT_SECRET_KEY,
  requestProperty: "auth",
  algorithms: ["HS256"],
});

export const hasAuthorization = (req, res, next) => {
  console.log(req.auth);
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!authorized) {
    return res.status(403).json({
      success: false,
      error: "User is unauthorized",
    });
  }

  next();
};
