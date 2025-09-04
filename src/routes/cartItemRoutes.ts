import { Router } from "express";
import { CartItemController } from "@/controllers/cartItemController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = Router();
router.post("/cart-item", authMiddleware, CartItemController.addItem);
router.get("/cart-item", authMiddleware, CartItemController.getAllItems);
router.get("/cart-item/:cartId", authMiddleware, CartItemController.getItems);
router.put("/cart-item/:id", authMiddleware, CartItemController.updateItem);
router.delete("/cart-item", authMiddleware, CartItemController.deleteItem);

export default router;
