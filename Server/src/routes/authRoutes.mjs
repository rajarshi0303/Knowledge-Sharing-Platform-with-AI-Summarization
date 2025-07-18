import express from "express";
import { authenticate } from "../middleware/authMiddleware.mjs";
import {
  register,
  login,
  logout,
  refreshTokenHandler,
  getMe,
} from "../controller/authController.mjs";
import { validate } from "../middleware/validate.mjs";
import { registerSchema, loginSchema } from "../validations/authSchema.mjs";

const router = express.Router();

router.post("/signup", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/logout", logout);
router.get("/refresh", refreshTokenHandler);
router.get("/me", authenticate, getMe);

export default router;
