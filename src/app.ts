import 'dotenv/config';
import auth_router from "./routes/cashierRoutes"
import product_router from "./routes/productRoutes"
import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import errorHandler from "./middlewares/errorHandler";

if (!process.env.FRONTEND_URL) {
  console.error('Missing required environment variable: FRONTEND_URL');
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
app.use(cors(corsOptions));

app.use("/api", auth_router, product_router);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
