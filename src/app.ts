import auth_router from "./routes/userRoutes";
import product_router from "../src/routes/productRoutes";
import invoice from "./routes/orderRoutes";
import cartRoutes from "./routes/cartRoutes";
import cartItemRoutes from "./routes/cartItemRoutes";
import orderRoutes from "./routes/orderRoutes";
import orderItemRoutes from "./routes/orderItemRoutes";
import "dotenv/config";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler";

if (!process.env.FRONTEND_URL) {
  console.error("Missing required environment variable: FRONTEND_URL");
  process.exit(1);
}

const corsOptions = {
  origin: [process.env.FRONTEND_URL],
  credentials: true,
};
const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());
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
app.use(cors(corsOptions));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
