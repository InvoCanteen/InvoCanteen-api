import { Router } from "express";
import { add_Product } from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/product/add", authMiddleware, add_Product);


export default router;
