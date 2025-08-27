import { Router } from "express";
import { OrderItemController } from "../controllers/orderItemController";

const router = Router();

router.post("/orderItems", OrderItemController.create);
router.get("/orderItems/order/:orderId", OrderItemController.getByOrder);
router.put("/orderItems/:id", OrderItemController.update);
router.delete("/orderItems/:id", OrderItemController.delete);

export default router;
