const prisma = require("../prisma");

exports.createExpense = async (data, key) => {
  if (!key) throw new Error("Missing idempotency key");

  const existing = await prisma.expense.findUnique({
    where: { idempotencyKey: key },
  });

  if (existing) return existing;

  return prisma.expense.create({
    data: {
      amount: Math.round(data.amount * 100),
      category: data.category,
      description: data.description,
      date: new Date(data.date),
      idempotencyKey: key,
    },
  });
};

exports.getExpenses = async ({ category, sort }) => {
  const where = category ? { category } : {};

  const expenses = await prisma.expense.findMany({
    where,
    orderBy: sort === "date_desc" ? { date: "desc" } : undefined,
  });

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return { expenses, total };
};
