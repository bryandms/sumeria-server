import { Router } from "express";
import { check } from "express-validator";
import { login } from "../controllers";

const router = Router();

// POST /api/auth/login
router.post("/login", [
  check("email", "The email field is required.").isEmail(),
  check("password", "The password must be at least 6 characters.")
    .trim()
    .isLength({
      min: 6,
    }),
  login,
]);

export { router as auth };
