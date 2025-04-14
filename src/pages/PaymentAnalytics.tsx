import React, { useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { IndianRupee, Calendar, Filter } from 'lucide-react';

interface PaymentMethod {
  id: string;
  name: string;
  orders: number;
  revenue: number;
  percentage: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const mockPaymentData: PaymentMethod[] = [
  {
    id: '1',
    name: 'UPI',
    orders: 1250,
    revenue: 875000,
    percentage: 45,
  },
  {
    id: '2',
    name: 'Credit Card',
    orders: 850,
    revenue: 637500,
    percentage: 30,
  },
  {
    id: '3',
    name: 'Debit Card',
    orders: 425,
    revenue: 318750,
    percentage: 15,
  },
  {
    id: '4',
    name: 'Net Banking',
    orders: 200,
    revenue: 150000,
    percentage: 7,
  },
  {
    id: '5',
    name: 'Cash on Delivery',
    orders: 75,
    revenue: 56250,
    percentage: 3,
  },
];

export default function PaymentAnalytics() {
  const [dateFilter, setDateFilter] = useState('this_month');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentData, setPaymentData] = useState<PaymentMethod[]>(mockPaymentData);

  const totalOrders = paymentData.reduce((sum, method) => sum + method.orders, 0);
  const totalRevenue = paymentData.reduce((sum, method) => sum + method.revenue, 0);
  const topMethod = paymentData.reduce((prev, current) =>
    prev.orders > current.orders ? prev : current
  );

  const chartData = paymentData.map((item) => ({
    name: item.name,
    value: item.percentage,
  }));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Orders</p>
              <h3 className="text-2xl font-bold">{totalOrders.toLocaleString()}</h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Revenue</p>
              <h3 className="text-2xl font-bold">{formatCurrency(totalRevenue)}</h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <IndianRupee className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Top Payment Method</p>
              <h3 className="text-2xl font-bold">{topMethod.name}</h3>
              <p className="text-sm text-gray-500 mt-1">
                {topMethod.percentage}% of total orders
              </p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <Filter className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Payment Analytics</h2>
          <div className="flex space-x-4">
            <select
              className="border rounded-md px-3 py-2"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
            >
              <option value="today">Today</option>
              <option value="this_week">This Week</option>
              <option value="this_month">This Month</option>
              <option value="last_month">Last Month</option>
              <option value="last_3_months">Last 3 Months</option>
            </select>
            <select
              className="border rounded-md px-3 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Orders</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={150}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Detailed Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment Method
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Orders
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Revenue
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Share
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paymentData.map((method) => (
                  <tr
                    key={method.id}
                    className={method.name === topMethod.name ? 'bg-blue-50' : ''}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span
                          className={`h-3 w-3 rounded-full mr-2 ${
                            method.name === topMethod.name
                              ? 'bg-blue-500'
                              : 'bg-gray-300'
                          }`}
                        ></span>
                        {method.name}
                        {method.name === topMethod.name && (
                          <span className="ml-2 px-2 py-1 text-xs font-medium text-blue-800 bg-blue-100 rounded-full">
                            Top Method
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {method.orders.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatCurrency(method.revenue)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {method.percentage}%
                    </td>
                  </tr>
                ))}
                <tr className="bg-gray-50 font-medium">
                  <td className="px-6 py-4 whitespace-nowrap">Total</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {totalOrders.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {formatCurrency(totalRevenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">100%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}