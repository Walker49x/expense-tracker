require("dotenv").config();
const express = require("express");
const cors = require("cors");

const expenseRoutes = require("./routes/expense.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/expenses", expenseRoutes);

app.listen(5000, () => console.log("Server running"));
