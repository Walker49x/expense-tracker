import { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";

const API =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000";

function App() {
  const [expenses, setExpenses] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const [categoryFilter, setCategoryFilter] = useState("");
  const [sort, setSort] = useState("");

  const [form, setForm] = useState({
    amount: "",
    category: "",
    description: "",
    date: "",
  });

  const fetchExpenses = async () => {
    let url = `${API}/expenses`;

    const params = [];
    if (categoryFilter) params.push(`category=${categoryFilter}`);
    if (sort) params.push(`sort=${sort}`);

    if (params.length) {
      url += `?${params.join("&")}`;
    }

    const res = await axios.get(url);
    setExpenses(res.data.expenses);
    setTotal(res.data.total);
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.amount <= 0) {
      alert("Amount must be positive");
      return;
    }

    setLoading(true);

    try {
      await axios.post(`${API}/expenses`, form, {
        headers: {
          "Idempotency-Key": uuid(),
        },
      });

      setForm({
        amount: "",
        category: "",
        description: "",
        date: "",
      });

      fetchExpenses();
    } catch (err) {
      alert("Error adding expense");
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: 40, fontFamily: "sans-serif" }}>
      <h1>Expense Tracker</h1>

      <h2>Total: ₹{total / 100}</h2>

      <form onSubmit={handleSubmit}>
        <input
          placeholder="Amount"
          type="number"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          required
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <input
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />

        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          required
        />

        <button disabled={loading}>
          {loading ? "Adding..." : "Add Expense"}
        </button>
      </form>

      <hr />

      <h3>Filters</h3>

      <input
        placeholder="Filter by category"
        value={categoryFilter}
        onChange={(e) => setCategoryFilter(e.target.value)}
      />

      <select onChange={(e) => setSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="date_desc">Newest first</option>
      </select>

      <button onClick={fetchExpenses}>Apply</button>

      <hr />

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Amount</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length === 0 ? (
            <tr>
              <td colSpan="4">No expenses found</td>
            </tr>
          ) : (
            expenses.map((e) => (
              <tr key={e.id}>
                <td>₹{e.amount / 100}</td>
                <td>{e.category}</td>
                <td>{e.description}</td>
                <td>{new Date(e.date).toLocaleDateString()}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
``
