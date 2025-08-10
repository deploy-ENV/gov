import React from "react";
import { Home, Box, Truck, CreditCard } from "lucide-react";

const cards = [
  {
    label: "Projects Active",
    value: 0,
    icon: Home,
    color: "from-blue-600 to-emerald-500",
  },
  {
    label: "Orders Received",
    value: 0,
    icon: Box,
    color: "from-emerald-500 to-blue-600",
  },
  {
    label: "Deliveries Completed",
    value: 0,
    icon: Truck,
    color: "from-blue-600 to-emerald-500",
  },
  {
    label: "Payments Received",
    value: 0,
    icon: CreditCard,
    color: "from-emerald-500 to-blue-600",
  },
];

export default function DashboardCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl bg-[#1A1F36]/80 border border-gray-700 shadow-md p-6 flex items-center gap-4 backdrop-blur-md hover:scale-[1.03] transition-transform"
        >
          <div className={`w-12 h-12 flex items-center justify-center rounded-lg bg-gradient-to-br ${card.color} bg-opacity-80`}>
            <card.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <div className="text-2xl font-bold text-white">{card.value}</div>
            <div className="text-gray-300 font-semibold text-sm mt-1">{card.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
} 