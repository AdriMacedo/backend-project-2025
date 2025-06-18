import { Router } from "express";
import { login, registerUser } from "../controllers/authController";
import { check } from "express-validator";
import { validate } from "../validators/validators";

const router = Router();

router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Email invalid"),
    check("password").isStrongPassword().withMessage("Pass should be strong"),
    check("name")
      .isLength({ min: 2, max: 100 })
      .withMessage("name should have ate least 2 chars"),
    check("role").not().exists().withMessage("role is not allowed"),
  ],
  validate,
  registerUser
);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Email invalid"),
    check("password").isStrongPassword().withMessage("Pwd invalid"),
  ],
  validate,
  login
);

export default router;
