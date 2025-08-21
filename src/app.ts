import router from "../src/routes/cashierRoutes"
import express from "express";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/cashier", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
