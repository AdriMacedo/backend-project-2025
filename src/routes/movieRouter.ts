import { Router } from "express";
import * as movieController from "../controllers/movieController";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";
import { movieRules, validate } from "../validators/validators";

const router = Router();

// rotas protegidas so para autenticados
router.get("/", authMiddleware, movieController.getAllMovies);
router.get("/search", authMiddleware, movieController.searchMovies);
router.get("/:id", authMiddleware, movieController.getMoviesById);

// rotas só para admin
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  movieRules,
  validate,
  movieController.createMovie
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  movieRules,
  validate,
  movieController.updateMovie
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  movieController.deleteMovie
);

export default router;
