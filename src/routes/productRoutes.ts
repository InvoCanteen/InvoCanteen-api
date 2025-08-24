import { Router } from "express";
import { addProduct, getAllProducts } from "../controllers/productController";
import { adminAuthMiddleware, authMiddleware } from "../middlewares/authMiddleware";
import { uploads } from "../utils/multer";


const router = Router();

router.post("/product/add", authMiddleware, adminAuthMiddleware, uploads.single('imageProduct'), addProduct);
router.get("/product/get", authMiddleware, getAllProducts);


export default router;
