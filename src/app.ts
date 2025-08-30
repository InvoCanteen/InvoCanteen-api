import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "@/routes/userRoutes";
import productRoutes from "@/routes/productRoutes";
import cartRoutes from "@/routes/cartRoutes";
import cartItemRoutes from "@/routes/cartItemRoutes";
import orderRoutes from "@/routes/orderRoutes";
import orderItemRoutes from "@/routes/orderItemRoutes";
import errorHandler from "@/middlewares/errorHandler";
import "dotenv/config";

if (!process.env.FRONTEND_URL) {
  console.error("Missing required environment variable: FRONTEND_URL");
  process.exit(1);
}

const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  credentials: true,
};
const app = express();
const port = 4500;
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
