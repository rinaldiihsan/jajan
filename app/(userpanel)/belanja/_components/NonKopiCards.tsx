'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product, ApiResponse } from '@/app/@types/ProductResponse';

export default function NonKopiCards() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/products`);
        const data: ApiResponse = await response.json();
        if (data.status === 'success') {
          const kopiProducts = data.data.filter((product) => product.category_id === 4);
          setProducts(kopiProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const priceFormatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  });

  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
        {products.map((product) => (
          <Link href={`/product/${product.id}`} key={product.id} className="relative md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] rounded-[20px] overflow-hidden group">
            <Image src={product.image_url} alt={product.name} width={450} height={450} className="w-full h-full object-cover" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#9F6744] to-transparent opacity-70" />

            <div className="absolute bottom-0 left-0 p-6 text-white z-10">
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-lg">{priceFormatter.format(product.price)}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
