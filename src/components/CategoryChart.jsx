import { PieChart, Pie, Tooltip } from "recharts";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function CategoryChart() {
  const { getToken } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = await getToken();
      const res = await fetch(
        "http://localhost:5000/api/expenses/summary",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setData(await res.json());
    };

    fetchData();
  }, []);

  return (
    <PieChart width={300} height={300}>
      <Pie data={data} dataKey="total" nameKey="category" />
      <Tooltip />
    </PieChart>
  );
}
