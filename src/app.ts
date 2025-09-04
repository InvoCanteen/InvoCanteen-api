import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import auth_router from "./routes/userRoutes";
import product_router from "../src/routes/productRoutes";
import invoice from "./routes/orderRoutes";
import cartRoutes from "./routes/cartRoutes";
import cartItemRoutes from "./routes/cartItemRoutes";
import orderRoutes from "./routes/orderRoutes";
import orderItemRoutes from "./routes/orderItemRoutes";
import errorHandler from "./middlewares/errorHandler";

// Pastikan env variable FRONTEND_URL ada
if (!process.env.FRONTEND_URL) {
  console.error("Missing required environment variable: FRONTEND_URL");
  process.exit(1);
}

const app = express();
const port = 4500;

// ✅ Middleware CORS harus sebelum route
const corsOptions = {
  origin: process.env.FRONTEND_URL, // misal: http://localhost:3000
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  credentials: true, // penting untuk cookie / auth
};
app.use(cors(corsOptions));

// ✅ Middleware umum
app.use(express.json());
app.use(cookieParser());

// ✅ Route
app.use(
  "/api",
  auth_router,
  product_router,
  invoice,
  cartRoutes,
  cartItemRoutes,
  orderRoutes,
  orderItemRoutes
);

// ✅ Error handler terakhir
app.use(errorHandler);

// ✅ Jalankan server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
