import express from "express";
import { authenticate, requireRole } from "../middleware/authMiddleware.mjs";
import {
  createArticle,
  getAllArticles,
  getMyArticles,
  getArticleById,
  getArticleHistory,
  updateArticle,
  deleteArticle,
  generateSummary,
} from "../controller/articlesController.mjs";

import { validate } from "../middleware/validate.mjs";
import {
  createArticleSchema,
  updateArticleSchema,
  idParamSchema,
} from "../validations/articleSchema.mjs";

const router = express.Router();

router.get("/", getAllArticles);

router.post(
  "/",
  authenticate,
  requireRole(["user", "admin"]),
  validate(createArticleSchema),
  createArticle
);

router.get("/my", authenticate, requireRole(["user", "admin"]), getMyArticles);

router.get("/:id", validate(idParamSchema), getArticleById);

router.get(
  "/:id/history",
  authenticate,
  requireRole(["user", "admin"]),
  validate(idParamSchema),
  getArticleHistory
);

router.get("/:id/summary", validate(idParamSchema), generateSummary);

router.put(
  "/:id",
  authenticate,
  requireRole(["user", "admin"]),
  validate(updateArticleSchema),
  updateArticle
);

router.delete(
  "/:id",
  authenticate,
  requireRole(["user", "admin"]),
  validate(idParamSchema),
  deleteArticle
);

export default router;
