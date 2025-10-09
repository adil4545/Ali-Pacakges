import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";
import { useGetAllAdminsQuery } from "../../../api/SuperAdminapi";
import type { UserProfile } from "../../../Types/Profile";

const COLORS = ["#f59e0b", "#fcd34d"];

export default function Dashboard() {
  const { data, isLoading, isFetching } = useGetAllAdminsQuery();
  const admins: UserProfile[] = data?.data ?? [];

  const totalAdmins = admins.length;
  const maleCount = admins.filter(
    (a) => a.gender?.toLowerCase() === "male"
  ).length;
  const femaleCount = admins.filter(
    (a) => a.gender?.toLowerCase() === "female"
  ).length;

  const barData = [{ name: "Admins", value: totalAdmins }];
  const pieData = [
    { name: "Male", value: maleCount },
    { name: "Female", value: femaleCount },
  ];

  if (isLoading || isFetching) {
    return (
      <div className="flex items-center justify-center h-64 text-amber-700 font-semibold">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <motion.h2
        className="text-2xl font-extrabold bg-gradient-to-r from-amber-600 to-amber-900 bg-clip-text text-transparent mb-4"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        Super Admin Dashboard
      </motion.h2>

      <motion.div
        className="bg-gradient-to-r from-white to-amber-50 rounded-2xl shadow-lg p-6 border h-[550px]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          {/* Admin Overview */}
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold text-amber-700 mb-4">
              📊 Admin Overview
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="name" />
                  <YAxis allowDecimals={false} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" radius={[10, 10, 0, 0]}>
                    {barData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Admin Distribution */}
          <div className="flex flex-col h-full">
            <h3 className="text-lg font-semibold text-amber-700 mb-4">
              🥧 Admin Distribution
            </h3>
            <div className="flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#f59e0b"
                    label
                  >
                    {pieData.map((_entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
