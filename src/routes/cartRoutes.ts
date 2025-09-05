// routes/cartRoutes.ts
import { Router } from "express";
import { CartController } from "@/controllers/cartController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = Router();

router.post("/cart", authMiddleware, CartController.createCart);
router.patch("/cart/:id", authMiddleware, CartController.updateCart);

router.get("/cart", authMiddleware, CartController.getAllCarts);
router.get("/cart/:id", authMiddleware, CartController.getCart);
router.delete("/cart/:id", authMiddleware, CartController.deleteCart);

export default router;
