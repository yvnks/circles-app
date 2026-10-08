import User from "../model/user.model.js";
import extend from "lodash";
import { asyncHandler } from "../utils/asyncHandler.js";
import CustomErrorHandlerAPI from "../helpers/customErrorHandlerApi.js";

export const getAllUsers = (req, res) => {};

export const createUser = asyncHandler(async (req, res, next) => {
  const user = await User.create(req.body);

  if (!user) {
    return next(
      new CustomErrorHandlerAPI(
        "An account with the following credentials exist.",
        400,
      ),
    );
  }
  res.status(200).json({
    success: true,
    data: user,
  });
});

export const getUser = (req, res) => {};

export const updateUser = (req, res) => {};

export const removeUser = (req, res) => {};

export const getUserById = (req, res) => {};
