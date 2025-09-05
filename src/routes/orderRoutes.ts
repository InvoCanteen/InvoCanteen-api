import { Router } from "express";
import { OrderController } from "@/controllers/orderController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = Router();

router.post("/orders/from-cart", authMiddleware, OrderController.createFromCart);
router.put("/orders/:id", authMiddleware, OrderController.markAsPaid);

router.get("/orders", OrderController.getAll);
router.get("/orders/:id", OrderController.getById);
router.delete("/orders/:id", OrderController.delete);
router.get("/unpaid-orders", OrderController.getAllUnpaid);
router.get("/paid-orders", OrderController.getAllPaid);

export default router;
