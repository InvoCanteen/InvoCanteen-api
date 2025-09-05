import { Router } from "express";
import { CartItemController } from "@/controllers/cartItemController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = Router();

router.post("/cart-item", authMiddleware, CartItemController.addItem);
//update jumlah makanan yang di dalam cart 
router.put("/cart-item/:id", authMiddleware, CartItemController.updateItem);

router.get("/cart-item/:cartId", authMiddleware, CartItemController.getItems);
router.delete("/cart-item/:id", authMiddleware, CartItemController.deleteItem);
router.get("/cart-item", authMiddleware, CartItemController.getAllItems);

export default router;
