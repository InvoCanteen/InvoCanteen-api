import { Router } from "express";
import { OrderController } from "../controllers/orderController";

const router = Router();

router.post("/orders", OrderController.create);
router.get("/orders", OrderController.getAll);
router.get("/orders/:id", OrderController.getById);
router.put("/orders/:id", OrderController.update);
router.delete("/orders/:id", OrderController.delete);

export default router;
