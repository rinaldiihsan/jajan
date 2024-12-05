'use client';

import React, { useEffect, useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import Cookies from 'js-cookie';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface OrderItem {
  price: number;
  product_name: string;
  quantity: number;
}

interface Order {
  id: number;
  created_at: string;
  items: OrderItem[];
  status: string;
  total_amount: number;
}

interface ApiResponse {
  status: string;
  message: string;
  data: Order[];
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchOrders = async () => {
    try {
      const token = Cookies.get('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data: ApiResponse = await response.json();

      if (data.status === 'success') {
        setOrders(data.data);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal memuat data pesanan',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancelOrder = async (orderId: number) => {
    try {
      const token = Cookies.get('accessToken');
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/orders/${orderId}/cancel`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (data.status === 'success') {
        toast({
          title: 'Berhasil',
          description: 'Pesanan berhasil dibatalkan',
        });
        // Refresh orders after cancellation
        fetchOrders();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Gagal membatalkan pesanan',
      });
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const priceFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#9F6744] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:min-h-[110vh] bg-[#9F6744] py-40 px-4 lg:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl p-8">
          <h1 className="text-3xl font-bold text-[#9F6744] mb-8">Riwayat Pesanan</h1>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID Pesanan</TableHead>
                  <TableHead>Produk</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Tanggal</TableHead>
                  <TableHead>Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">#{order.id}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {order.items.map((item, index) => (
                          <div key={index} className="text-sm">
                            {item.product_name} ({item.quantity}x)
                          </div>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>{priceFormatter.format(order.total_amount)}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`${getStatusColor(order.status)} border-0`}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{format(new Date(order.created_at), 'dd MMM yyyy')}</TableCell>
                    <TableCell>
                      {order.status.toLowerCase() === 'pending' && (
                        <Button variant="destructive" size="sm" onClick={() => handleCancelOrder(order.id)} className="bg-red-500 hover:bg-red-600">
                          Batalkan
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {orders.length === 0 && <div className="text-center py-8 text-gray-500">Belum ada pesanan</div>}
        </div>
      </div>
    </div>
  );
}
