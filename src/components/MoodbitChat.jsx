import { useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function MoodbitChat({
  budget,
  totalSpent,
  healthScore,
  mood,
}) {
  const { getToken } = useAuth();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = async () => {
    if (!input) return;

    const token = await getToken();

    const res = await fetch("http://localhost:5000/api/ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: input,
        context: {
          budget,
          totalSpent,
          healthScore,
          mood,
        },
      }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "user", text: input },
      { role: "ai", text: data.reply },
    ]);

    setInput("");
  };

  return (
    <div className="bg-slate-800 p-4 rounded text-white">
      <h2 className="text-lg mb-2">Ask Moodbit 🤖</h2>

      <div className="h-40 overflow-y-auto text-sm mb-2">
        {messages.map((m, i) => (
          <p key={i} className={m.role === "ai" ? "text-green-400" : ""}>
            <b>{m.role === "ai" ? "Moodbit:" : "You:"}</b> {m.text}
          </p>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-1 rounded text-white"
          placeholder="Ask about your spending..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 px-3 rounded text-white"
        >
          Send
        </button>
      </div>
    </div>
  );
}
