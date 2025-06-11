import { Router } from "express";
import * as movieController from "../controllers/movieController";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

const router = Router();

// rotas protegidas so para autenticados
router.get("/", authMiddleware, movieController.getAllMovies);
router.get("/search", authMiddleware, movieController.searchMovies);


// rotas só para admin
router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  movieController.createMovie
);
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  movieController.updateMovie
);
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  movieController.deleteMovie
);

export default router;
