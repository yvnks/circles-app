import User from "../model/user.model.js";
import extend from "lodash";
import { asyncHandler } from "../utils/asyncHandler.js";
import CustomErrorHandlerAPI from "../helpers/customErrorHandlerApi.js";

export const getAllUsers = (req, res, next) => {};

export const createUser = asyncHandler(async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });

  if (existingUser) {
    return next(
      new CustomErrorHandlerAPI(
        "An account with the following credentials exists",
        400,
      ),
    );
  }

  const user = await User.create(req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const getUser = (req, res) => {};

export const updateUser = (req, res) => {};

export const removeUser = (req, res) => {};

export const getUserById = (req, res) => {};
