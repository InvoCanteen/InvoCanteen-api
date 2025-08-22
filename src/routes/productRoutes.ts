import { Router } from "express";
import { add_Product, get_All_Product } from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/product/add", authMiddleware, add_Product);
router.get("/product/get", authMiddleware, get_All_Product);


export default router;
