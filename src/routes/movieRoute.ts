import { Router } from 'express';
import * as movieController from "../controllers/movieController";
import authMiddleware from "../middleware/authMiddleware";


const router = Router();


router.get("/", authMiddleware, movieController.getAllMovies);