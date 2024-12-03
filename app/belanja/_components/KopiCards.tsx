'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DummyProduct from '@/assets/user/dummy-product.png';

export default function KopiCards() {
  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Link href="/" key={item} className="relative md:w-[350px] md:h-[350px] lg:w-[450px] lg:h-[450px] rounded-[20px] overflow-hidden group">
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
