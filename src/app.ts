import auth_router from "../src/routes/cashierRoutes"
import product_router from "../src/routes/productRoutes"
import express from "express";
import cookieParser from "cookie-parser";

const app = express();
const port = 3000;
app.use(express.json());
app.use(cookieParser());
app.use("/api", auth_router, product_router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
