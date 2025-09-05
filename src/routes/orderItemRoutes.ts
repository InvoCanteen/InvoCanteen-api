import { Router } from "express";
import { OrderItemController } from "@/controllers/orderItemController";

const router = Router();

// === ALUR ITEM PESANAN ===

// Endpoint untuk membuat item pesanan secara manual (jarang digunakan langsung).
router.post("/orderItems", OrderItemController.create);

// Endpoint untuk mendapatkan semua item dari satu pesanan spesifik.
router.get("/orderItems/order/:orderId", OrderItemController.getByOrder);

// Endpoint untuk mengubah item dalam pesanan (misalnya, jika ada koreksi).
router.put("/orderItems/:id", OrderItemController.update);

// Endpoint untuk menghapus item dari pesanan.
router.delete("/orderItems/:id", OrderItemController.delete);

export default router;
