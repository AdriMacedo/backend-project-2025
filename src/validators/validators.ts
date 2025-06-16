import { NextFunction, Response, Request } from "express";
import { check } from "express-validator";
import { validationResult } from "express-validator/lib/validation-result";

export const movieRules =  [
    check("title").notEmpty().withMessage("Title is required"),
    check("releaseDate")
      .isISO8601()
      .withMessage("Release date must be in YYYY-MM-DD format"),
    check("trailerLink").isURL().withMessage("Trailer link must be a valid URL"),
    check("genres")
      .isArray({ min: 1 })
      .withMessage("Genres must be an array with at least one genre"),
    check("genres.*").isString().withMessage("Each genre must be a string"),
  ];

export const validate = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    next();
  };

  