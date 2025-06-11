import { Router } from "express";
import * as userController from "../controllers/userController";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";

const router = Router();

// rotas só para admin
router.use(authMiddleware);
router.use(roleMiddleware("admin"));

router.get("/", userController.getAllUsers);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deleteUser);

export default router;
