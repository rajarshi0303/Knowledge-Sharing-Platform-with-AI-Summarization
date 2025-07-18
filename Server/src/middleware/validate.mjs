import { ZodError } from "zod";

export const validate = (schema) => (req, res, next) => {
  try {
    const parsed = schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    req.validated = parsed;
    next();
  } catch (err) {
    if (err instanceof ZodError) {
      return res.status(400).json({
        error: "Validation failed",
        details: err.errors.map((e) => ({
          path: e.path.join("."),
          message: e.message,
        })),
      });
    }
    next(err); // Unexpected error
  }
};
