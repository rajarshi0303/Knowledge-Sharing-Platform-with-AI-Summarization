import express from "express";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.mjs";
import { requireRole, authenticate } from "../middleware/authMiddleware.mjs";
import { validate } from "../middleware/validate.mjs";
import {
  createUserSchema,
  updateUserSchema,
  deleteUserSchema,
} from "../validations/userSchema.mjs";

const router = express.Router();

router.use(authenticate);
router.use(requireRole(["admin"]));

router.get("/", getUsers);
router.post("/", validate(createUserSchema), createUser);
router.put("/:id", validate(updateUserSchema), updateUser);
router.delete("/:id", validate(deleteUserSchema), deleteUser);

export default router;
