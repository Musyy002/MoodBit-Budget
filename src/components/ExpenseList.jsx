import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function ExpenseList() {
  const { getToken } = useAuth();
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    const token = await getToken();

    const res = await fetch("http://localhost:5000/api/expenses", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setExpenses(await res.json());
  };

  const deleteExpense = async (id) => {
    const token = await getToken();

    await fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchExpenses();
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div className="mt-4 space-y-2">
      {expenses.map((e) => (
        <div
          key={e.id}
          className="flex justify-between bg-slate-800 p-3 rounded text-white"
        >
          <span>{e.category} – ₹{e.amount}</span>
          <button
            onClick={() => deleteExpense(e.id)}
            className="text-red-400"
          >
            ❌
          </button>
        </div>
      ))}
    </div>
  );
}
