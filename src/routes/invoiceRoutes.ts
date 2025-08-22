import { Router } from "express";
import { InvoiceController } from "../controllers/InvoiceController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();
router.post("/create", authMiddleware, InvoiceController.createInvoice);

export default router;
