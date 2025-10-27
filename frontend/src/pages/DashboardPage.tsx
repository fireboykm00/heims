import { useEffect, useState } from "react";
import { api } from "@/services/api";
import type { DashboardStats } from "@/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Pill,
  Package,
  Building2,
  AlertTriangle,
  Clock,
  Wrench,
  ShoppingCart,
} from "lucide-react";

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await api.getDashboardStats();
      setStats(response.data);
    } catch (error) {
      console.error("Failed to load stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Medicines",
      value: stats?.totalMedicines || 0,
      icon: Pill,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Total Equipment",
      value: stats?.totalEquipment || 0,
      icon: Package,
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Total Suppliers",
      value: stats?.totalSuppliers || 0,
      icon: Building2,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Pending Orders",
      value: stats?.pendingOrders || 0,
      icon: ShoppingCart,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
  ];

  const alertCards = [
    {
      title: "Low Stock Medicines",
      value: stats?.lowStockMedicines || 0,
      description: "Medicines below threshold",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50",
    },
    {
      title: "Expiring Soon",
      value: stats?.expiringMedicines || 0,
      description: "Medicines expiring in 30 days",
      icon: Clock,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50",
    },
    {
      title: "Maintenance Due",
      value: stats?.equipmentNeedingMaintenance || 0,
      description: "Equipment needs maintenance",
      icon: Wrench,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  if (loading) {
    return <div className="text-center py-12">Loading dashboard...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of hospital inventory system
        </p>
      </div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alerts */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Alerts & Notifications</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {alertCards.map((alert) => {
            const borderColorMap: Record<string, string> = {
              'text-red-600': '#dc2626',
              'text-yellow-600': '#ca8a04',
              'text-indigo-600': '#4f46e5',
            };
            return (
            <Card
              key={alert.title}
              className="border-l-4"
              style={{ borderLeftColor: borderColorMap[alert.color] || '#6b7280' }}
            >
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="text-sm font-medium">
                    {alert.title}
                  </CardTitle>
                  <CardDescription className="text-xs mt-1">
                    {alert.description}
                  </CardDescription>
                </div>
                <div className={`p-2 rounded-lg ${alert.bgColor}`}>
                  <alert.icon className={`h-5 w-5 ${alert.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{alert.value}</div>
              </CardContent>
            </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
