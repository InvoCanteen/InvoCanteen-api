import auth_router from "./routes/userRoutes";
import product_router from "../src/routes/productRoutes";
import invoice from "./routes/invoiceRoutes";
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());
app.use("/api", auth_router, product_router, invoice);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
