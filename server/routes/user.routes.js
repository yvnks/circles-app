import express from "express";
import {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  removeUser,
  // getUserById,
} from "../controllers/user.controller.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:userId")
  .get(getUser)
  .patch(updateUser)
  .delete(removeUser);

// router.param("userId", getUserById);

export default router;
