import { Router } from "express";
import { statisticOrdersController } from "@/controllers/statisticController";

const router = Router();

router.get("/all-statistic", statisticOrdersController.list); // semua transaksi
router.get("/statistic", statisticOrdersController.statistics); // transaksi harian
router.get("/statistic/categories", statisticOrdersController.statsByCategory); // jumlah jenis produk per kategori

export default router;
