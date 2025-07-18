import { z } from "zod";

export const createUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    role: z.enum(["user", "admin"]).optional(),
  }),
  query: z.object({}).optional(),
  params: z.object({}).optional(),
});

export const updateUserSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    role: z.enum(["user", "admin"]).optional(),
  }),
  params: z.object({
    id: z.string().length(24, "Invalid article ID"),
  }),
});

export const deleteUserSchema = z.object({
  params: z.object({
    id: z.string().length(24, "Invalid article ID"),
  }),
});
