import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function AddExpense({ onAdd }) {
  const { getToken } = useAuth();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = await getToken();

    await fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        amount: Number(amount),
        category,
        note,
      }),
    });

    setAmount("");
    setCategory("");
    setNote("");
    onAdd();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        placeholder="Amount"
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full p-2 rounded"
      />
      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full p-2 rounded"
      />
      <input
        placeholder="Note (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full p-2 rounded"
      />
      <button className="bg-green-500 px-4 py-2 rounded text-white">
        Add Expense
      </button>
    </form>
  );
}
