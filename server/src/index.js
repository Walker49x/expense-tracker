require("dotenv").config();
const express = require("express");
const cors = require("cors");

const expenseRoutes = require("./routes/expense.routes");

const app = express();

// ✅ Middlewares
app.use(cors());
app.use(express.json());

// ✅ Routes
app.use("/expenses", expenseRoutes);

// ✅ Health check (useful for Render)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ IMPORTANT: Dynamic port for Render
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});
