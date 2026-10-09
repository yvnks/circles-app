import express from "express";
import { signin, signout } from "../controllers/auth.controller.js";

const router = express.Router();

// integrating user auth and password protected routes.
router.route("/signin").post(signin);
router.route("/signout").get(signout);

export default router;
