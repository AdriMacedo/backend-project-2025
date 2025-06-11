import { NextFunction, Router, Request, Response } from "express";
import { login, registerUser } from "../controllers/authController";
import { check, validationResult } from "express-validator";

const router = Router();

const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(400).json({ errors: errors.array() });
    return;
  }
  next();
};

router.post(
  "/register",
  [
    check("email").isEmail().withMessage("Email invalid"),
    check("password").isStrongPassword().withMessage("Pass should be strong"),
    check("name")
      .isLength({ min: 2, max: 100 })
      .withMessage("name should have ate least 2 chars"),
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
