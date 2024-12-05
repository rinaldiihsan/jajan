'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

interface ProductDetail {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  image_url: string;
  category_id: number;
  category_name: string;
  is_active: boolean;
}

interface ApiResponse {
  status: string;
  message: string;
  data: ProductDetail;
}

export default function page() {
  const params = useParams();
  const { toast } = useToast();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      // Extract ID from slug (format: product-name-123)
      const productId = params.slug.toString().split('-').pop();

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products/${productId}`);
        const data: ApiResponse = await response.json();
        if (data.status === 'success') {
          setProduct(data.data);
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Gagal memuat detail produk',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug, toast]);

  const handleQuantityChange = (type: 'increase' | 'decrease') => {
    if (type === 'increase' && product && quantity < product.stock) {
      setQuantity((prev) => prev + 1);
    } else if (type === 'decrease' && quantity > 1) {
      setQuantity((prev) => prev - 1);
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

  if (!product) return null;

  return (
    <div className="min-h-screen lg:min-h-[110vh] bg-[#9F6744] py-48 px-4 lg:px-0">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-3xl overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Image Section */}
            <div className="relative h-[400px] lg:h-[600px]">
              <Image src={product.image_url} alt={product.name} fill className="object-cover" priority />
            </div>

            {/* Content Section */}
            <div className="p-8 lg:p-12 flex flex-col">
              <div className="flex-1">
                <span className="inline-block px-3 py-1 bg-[#9F6744]/10 text-[#9F6744] rounded-full text-sm mb-4">{product.category_name}</span>
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 uppercase">{product.name}</h1>
                <p className="text-2xl font-semibold text-[#9F6744] mb-6">{priceFormatter.format(product.price)}</p>
                <p className="text-gray-600 mb-8">{product.description}</p>
                <div className="mb-8">
                  <p className="text-sm text-gray-500 mb-2">Stock tersedia: {product.stock}</p>
                  <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange('decrease')} disabled={quantity <= 1}>
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => handleQuantityChange('increase')} disabled={product && quantity >= product.stock}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-[#9F6744] hover:bg-[#8A583A] text-white py-7 rounded-full flex items-center justify-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Tambah ke Keranjang
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
