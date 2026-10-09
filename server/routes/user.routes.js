import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  removeUser,
} from "../controllers/user.controller.js";
import userById from "../middleware/userById.js";
import {
  requireSignin,
  hasAuthorization,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:userId")
  .get(requireSignin, getUser)
  .patch(requireSignin, hasAuthorization, updateUser)
  .delete(requireSignin, hasAuthorization, removeUser);

router.param("userId", userById);

export default router;

// GET http://localhost:3000/api/v1/users/:123
