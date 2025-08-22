import { Router } from "express";
import { CashierController } from "../controllers/cashierController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", CashierController.register);
router.post("/login", CashierController.login);
router.delete("/logout", CashierController.logout);

router.get("/profile", authMiddleware, (req, res) => {
  return res.json({ message: "You are authorized", user: (req as any).user });
});

export default router;
