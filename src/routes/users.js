import { Router } from "express";
import { check } from "express-validator";
import { createUser } from "../controllers";

const router = Router();

// POST /api/users
router.post(
  "/users",
  [
    check("name", "The name field is required.").trim().not().isEmpty(),
    check("email", "The email field is required.").isEmail(),
    check("password", "The password must be at least 6 characters.")
      .trim()
      .isLength({
        min: 6,
      }),
  ],
  createUser
);

export { router as users };
