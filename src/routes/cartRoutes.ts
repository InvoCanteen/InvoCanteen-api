import { Router } from "express";
import { CartController } from "../controllers/cartController";

const router = Router();

router.post("/cart/create", CartController.createCart);
router.post("/cart/add-item", CartController.addCartItem);

export default router;
