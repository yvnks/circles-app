import User from "../model/user.model.js";
import extend from "lodash";
import { asyncHandler } from "../utils/asyncHandler.js";
import CustomErrorHandlerAPI from "../helpers/customErrorHandlerApi.js";

export const getAllUsers = asyncHandler(async (req, res, next) => {
  const users = await User.find({});

  res.status(200).json({
    success: true,
    data: users,
    count: users.length,
  });
});

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

export const getUser = asyncHandler(async (req, res) => {
  req.profile.password = undefined;

  res.status(200).json({
    success: true,
    data: req.profile,
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  let user = req.profile;
  // update user.
  user = await User.findByIdAndUpdate(user.id, req.body, {
    returnDocument: "after",
    runValidators: true,
  });

  user.updated = Date.now();
  user = extend(user, req.body);

  res.status(200).json({
    success: true,
    data: user,
  });
});

export const removeUser = asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.profile.id);

  res.status(200).json({
    success: true,
    data: {},
  });
});
