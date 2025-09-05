import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";

import userRoutes from "@/routes/userRoutes";
import productRoutes from "@/routes/productRoutes";
import cartRoutes from "@/routes/cartRoutes";
import cartItemRoutes from "@/routes/cartItemRoutes";
import orderRoutes from "@/routes/orderRoutes";
import orderItemRoutes from "@/routes/orderItemRoutes";
import errorHandler from "@/middlewares/errorHandler";

if (!process.env.FRONTEND_URL) {
  console.error("Missing required environment variable: FRONTEND_URL");
  process.exit(1);
}

const app = express();
export const port = 4500;
const corsOptions = {
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.status(200).send(
    "<h1>Aplikasi Berjalan</h1><p>Selamat datang di API InvoCanteen.</p>"
  );
});

app.use(
  "/api",
  userRoutes,
  productRoutes,
  cartRoutes,
  cartItemRoutes,
  orderRoutes,
  orderItemRoutes
);
app.use(errorHandler);

export default app;
