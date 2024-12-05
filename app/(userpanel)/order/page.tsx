'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Cookies from 'js-cookie';

interface ProductDetail {
  id: number;
  name: string;
  price: number;
  stock: number;
}

interface OrderFormData {
  shipping_address: string;
  shipping_phone: string;
  notes: string;
}

interface StoredProduct extends ProductDetail {
  quantity: number;
}

export default function OrderPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [formData, setFormData] = useState<OrderFormData>({
    shipping_address: '',
    shipping_phone: '',
    notes: '',
  });
  const [storedProduct, setStoredProduct] = useState<StoredProduct | null>(null);
  const accessToken = Cookies.get('accessToken');

  useEffect(() => {
    const productData = localStorage.getItem('selectedProduct');
    if (productData) {
      const parsed = JSON.parse(productData);
      setStoredProduct(parsed);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessToken) {
      toast({
        title: 'Error',
        description: 'Silakan login terlebih dahulu',
        variant: 'destructive',
      });
      router.push('/login');
      return;
    }

    try {
      const orderData = {
        items: [
          {
            product_id: storedProduct?.id,
            quantity: storedProduct?.quantity,
          },
        ],
        ...formData,
      };

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/orders`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (data.status === 'success') {
        toast({
          title: 'Berhasil',
          description: 'Pesanan berhasil dibuat',
        });
        localStorage.removeItem('selectedProduct');
        router.push('/');
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Gagal membuat pesanan',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const priceFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  const totalPrice = storedProduct ? storedProduct.price * storedProduct.quantity : 0;

  return (
    <div className="min-h-screen lg:min-h-[110vh] bg-[#9F6744] py-40 px-4 lg:px-0">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl p-8 lg:p-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Form Pemesanan</h1>

          {storedProduct && (
            <div className="mb-8 p-6 bg-[#FDF8F3] rounded-xl">
              <h2 className="font-semibold mb-4">{storedProduct.name}</h2>
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-600">Jumlah:</span>
                <span className="text-lg font-medium">{storedProduct.quantity}</span>
              </div>
              <div className="flex justify-between items-center border-t pt-4">
                <span className="text-gray-600">Total:</span>
                <p className="text-lg text-[#9F6744] font-semibold">{priceFormatter.format(totalPrice)}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Alamat Pengiriman</label>
              <Textarea name="shipping_address" value={formData.shipping_address} onChange={handleInputChange} placeholder="Masukkan alamat lengkap" required className="min-h-[100px]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nomor Telepon</label>
              <Input type="tel" name="shipping_phone" value={formData.shipping_phone} onChange={handleInputChange} placeholder="Masukkan nomor telepon" required />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Catatan</label>
              <Textarea name="notes" value={formData.notes} onChange={handleInputChange} placeholder="Tambahkan catatan (opsional)" className="min-h-[80px]" />
            </div>

            <Button type="submit" className="w-full bg-[#9F6744] hover:bg-[#8A583A] text-white py-6 rounded-full">
              Buat Pesanan
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
