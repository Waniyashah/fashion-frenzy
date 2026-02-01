"use client";

import { useEffect, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getUserOrders } from "@/app/actions/order";
import Image from "next/image";
import Link from "next/link";
import { Clock, Package, CheckCircle, XCircle } from "lucide-react";

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  size?: string;
  color?: string;
  image?: string;
}

interface Order {
  _id: string;
  orderNumber: string;
  total: number;
  status: string;
  createdAt: string;
  items: OrderItem[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(storedUser);
      const result = await getUserOrders(user.email);

      if (result.success) {
        setOrders(result.orders);
      } else {
        setError(result.error || "Failed to fetch orders");
      }
      setLoading(false);
    };

    fetchOrders();
  }, []);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'cancelled':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'shipped':
        return <Package className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
     switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      case 'shipped': return 'bg-blue-100 text-blue-800 border-blue-200';
      default: return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="container mx-auto px-4 py-20 flex justify-center">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#D4AF37]"></div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <Header />
      <main className="container mx-auto px-4 md:px-6 py-12">
        <h1 className="text-3xl font-bold mb-8 uppercase tracking-widest border-b pb-4">My Orders</h1>

        {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-sm border border-red-200 mb-6">
                {error}
            </div>
        )}

        {orders.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-sm">
            <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <h2 className="text-xl font-bold mb-2">No orders found</h2>
            <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
            <Link href="/products" className="text-[#D4AF37] hover:underline font-medium">
                Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="border border-gray-200 rounded-sm overflow-hidden hover:shadow-md transition-shadow">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex flex-wrap gap-4 justify-between items-center">
                    <div className="flex gap-8">
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Order Placed</p>
                            <p className="text-sm font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Total</p>
                            <p className="text-sm font-medium">PKR {order.total.toLocaleString()}</p>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-xs text-gray-500 uppercase tracking-wider font-bold">Order #</p>
                            <p className="text-sm font-medium text-gray-700">{order.orderNumber}</p>
                        </div>
                    </div>
                    <div className={`flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wide ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        {order.status}
                    </div>
                </div>

                {/* Order Items */}
                <div className="p-6 space-y-6">
                    {order.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                            <div className="w-20 h-24 bg-gray-100 relative rounded-sm overflow-hidden flex-shrink-0">
                                {item.image ? (
                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Img</div>
                                )}
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-lg mb-1">{item.name}</h4>
                                <div className="text-sm text-gray-500 flex gap-4">
                                    {item.size && <span>Size: {item.size}</span>}
                                    {item.color && <span>Color: {item.color}</span>}
                                    <span>Qty: {item.quantity}</span>
                                </div>
                                <p className="text-[#D4AF37] font-medium mt-2">PKR {item.price.toLocaleString()}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
