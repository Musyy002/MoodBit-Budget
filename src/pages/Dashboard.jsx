import { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";

import AddExpense from "../components/AddExpense";
import ExpenseList from "../components/ExpenseList";
import CategoryChart from "../components/CategoryChart";
import BudgetCard from "../components/BudgetCard";
import MoodBit from "../components/Moodbit";
import { calculateHealthScore } from "../utils/calculateHealthScore";
import HealthScore from "../components/HealthScore";
import GamificationPanel from "../components/GamificationPanel";
import MoodbitChat from "../components/MoodbitChat";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  const [totalSpent, setTotalSpent] = useState(0);
  const [budget, setBudget] = useState(null);

  const [expenses, setExpenses] = useState([]);
  const [healthScore, setHealthScore] = useState(0);

  const [stats, setStats] = useState(null);


  // 🔹 Phase 2: Sync user to DB (DO NOT REMOVE)
  useEffect(() => {
    if (!isLoaded || !user) return;

    const syncUser = async () => {
      const token = await getToken();

      await fetch("http://localhost:5000/api/user/sync", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: user.primaryEmailAddress.emailAddress,
        }),
      });
    };

    syncUser();
  }, [isLoaded, user]);

  // 🔹 Phase 4: Fetch expenses & calculate total
  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchTotal = async () => {
      const token = await getToken();

      const res = await fetch("http://localhost:5000/api/expenses", {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      const data = await res.json();
      setExpenses(data);
      
      const sum = data.reduce((acc, e) => acc + e.amount, 0);
      setTotalSpent(sum);
      
    };

    fetchTotal();
  }, [isLoaded, user]);

  // 🔹 Phase 4: Fetch budget (used by BudgetCard + MoodBit)
  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchBudget = async () => {
      const token = await getToken();

      const res = await fetch("http://localhost:5000/api/budget", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setBudget(data?.monthlyLimit || null);
    };

    fetchBudget();
  }, [isLoaded, user]);

  useEffect(() => {
    if (!budget || expenses.length === 0) return;
  
    const score = calculateHealthScore({
      totalSpent,
      budget,
      expenses,
    });
  
    setHealthScore(score);
  }, [budget, expenses, totalSpent]);
  
  useEffect(() => {
    if (!isLoaded || !user) return;
  
    const fetchStats = async () => {
      const token = await getToken();
      const res = await fetch("http://localhost:5000/api/stats", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(await res.json());
    };
  
    fetchStats();
  }, [isLoaded, user]);

  useEffect(() => {
    if (healthScore > 80) {
      fetch("http://localhost:5000/api/stats/xp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ xp: 30 }),
      });
    }
  }, [healthScore]);
  

  return (
    <div className="p-6 text-black">
      <h1 className="text-2xl mb-6">
        Welcome {user?.firstName} 👋
      </h1>

      {/* Budget + MoodBit */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <BudgetCard
          totalSpent={totalSpent}
          budget={budget}
          setBudget={setBudget}
        />
        <MoodBit totalSpent={totalSpent} budget={budget} />
        <HealthScore score={healthScore} />
        <MoodbitChat
          budget={budget}
          totalSpent={totalSpent}
          healthScore={healthScore}
          mood={totalSpent > budget ? "angry" : "happy"}
        />

      </div>

      <div className="mt-5">
        <GamificationPanel
          xp={stats?.xp}
          level={stats?.level}
          badges={stats?.badges}
        />
      </div>


      {/* Charts + Expense List */}
      <div className="flex flex-col md:flex-row gap-8 mt-8">
        <CategoryChart />
        <ExpenseList />
      </div>

      {/* Add Expense */}
      <div className="mt-8">
        <AddExpense onAdd={() => window.location.reload()} />
      </div>
    </div>
  );
}
