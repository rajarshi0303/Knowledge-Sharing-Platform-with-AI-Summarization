import { z } from "zod";

export const createArticleSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(15, "Content must be at least 15 characters"),
  }),
});

export const updateArticleSchema = z.object({
  body: z.object({
    title: z.string().min(5).optional(),
    content: z.string().min(20).optional(),
  }),
  params: z.object({
    id: z.string().length(24, "Invalid article ID"),
  }),
});

export const idParamSchema = z.object({
  params: z.object({
    id: z.string().length(24, "Invalid article ID"),
  }),
});
