'use client';

import React from 'react';
import Image from 'next/image';
import DummyProduct from '@/assets/user/dummy-product.png';
import Link from 'next/link';

export default function ProductCards() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Link href="/" key={item} className="relative w-[350px] h-[350px] rounded-[20px] overflow-hidden group">
            {/* Image */}
            <Image src={DummyProduct} alt="Kopi Gula Aren" className="w-full h-full object-cover" />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#9F6744] to-transparent opacity-70" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 p-6 text-white z-10">
              <h3 className="text-2xl font-semibold mb-2">Kopi Gula Aren</h3>
              <p className="text-lg">Rp. 15.000</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
