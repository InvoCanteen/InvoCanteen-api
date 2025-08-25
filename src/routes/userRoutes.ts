import { Router } from "express";
import { CashierController } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { uploads } from "../utils/multer";

const router = Router();

router.post("/register", CashierController.register);
router.post("/login", CashierController.login);
router.delete("/logout", authMiddleware, CashierController.logout);
router.get("/profile", authMiddleware, CashierController.getProfile);
router.put("/profile/update", authMiddleware, uploads.single('photoProfile'), CashierController.updateProfile);
router.patch("/password/update", authMiddleware, CashierController.updatePasswod);

export default router;
