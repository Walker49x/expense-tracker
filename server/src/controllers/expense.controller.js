const expenseService = require("../services/expense.service");

exports.createExpense = async (req, res) => {
  try {
    const key = req.headers["idempotency-key"];
    const expense = await expenseService.createExpense(req.body, key);
    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getExpenses = async (req, res) => {
  const data = await expenseService.getExpenses(req.query);
  res.json(data);
};
