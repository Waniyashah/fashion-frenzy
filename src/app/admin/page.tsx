'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getAllOrders } from '@/app/actions/order';
import Link from 'next/link';

interface Order {
  _id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    size?: string;
    color?: string;
  }>;
}

export default function AdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // 1. Auth Check - RESTRICTED ACCESS
    // Check if user is logged in and is the specific admin
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/auth/login');
      return;
    }

    const user = JSON.parse(storedUser);
    if (user.email !== 'waniyashah615@gmail.com') {
      // Not the admin? Kick them out.
      router.push('/');
      return;
    }

    // 2. Fetch Data
    const fetchOrders = async () => {
      try {
        const result = await getAllOrders();
        if (result.success && result.orders) {
          setOrders(result.orders);
        } else {
          console.error('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [router]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl font-semibold">Loading Admin Panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Link href="/" className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 transition">
            Back to Shop
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden border border-gray-200">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-medium text-gray-900">Order History</h2>
            </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-4 font-semibold">Order ID</th>
                  <th className="px-6 py-4 font-semibold">Customer Name</th>
                  <th className="px-6 py-4 font-semibold">Customer Email</th>
                  <th className="px-6 py-4 font-semibold">Items</th>
                  <th className="px-6 py-4 font-semibold">Total</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.map((order) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {order.orderNumber}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.user?.firstName} {order.user?.lastName}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      {order.user?.email || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-gray-600">
                      <div className="flex flex-col gap-1">
                        {order.items && order.items.map((item, idx) => (
                          <span key={idx} className="block text-xs">
                            {item.quantity}x {item.name} 
                            {item.size && ` (${item.size})`} 
                            {item.color && ` - ${item.color}`}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-900">
                      PKR {order.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize
                        ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 
                          order.status === 'shipped' ? 'bg-blue-100 text-blue-800' : 
                          order.status === 'cancelled' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {orders.length === 0 && (
            <div className="p-8 text-center text-gray-500">
              No orders found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
