import express from "express";
import cashier from "./routes/userRoutes";
import invoice from "./routes/invoiceRoutes";

const app = express();
const port = 3000;

app.use(express.json());
app.use("/cashier", cashier);
app.use("/invoice", invoice);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
