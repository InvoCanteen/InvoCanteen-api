import { Router } from "express";
import { addProduct, deleteProduct, detailProduct, getAllProducts, updateProduct } from "../controllers/productController";
import { adminAuthMiddleware, authMiddleware } from "../middlewares/authMiddleware";
import { uploads } from "../utils/multer";


const router = Router();

router.post("/product/add", authMiddleware, adminAuthMiddleware, uploads.single('imageProduct'), addProduct);
router.get("/product/get", authMiddleware, getAllProducts);
router.put("/product/update/:id", authMiddleware, adminAuthMiddleware, uploads.single('imageProduct'), updateProduct);
router.get("/product/:id", authMiddleware, detailProduct);
router.delete("/product/delete/:id", authMiddleware, adminAuthMiddleware, deleteProduct);




export default router;
