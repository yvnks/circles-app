import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  removeUser,
} from "../controllers/user.controller.js";
import userById from "../middleware/userById.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router.route("/:userId").get(getUser).patch(updateUser).delete(removeUser);

router.param("userId", userById);

export default router;

// GET http://localhost:3000/api/v1/users/:123
