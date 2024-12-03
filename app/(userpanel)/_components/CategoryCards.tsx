'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CategoryKopi from '@/assets/user/kopi-category.png';
import CategoryNonKopi from '@/assets/user/non-kopi-category.png';
import CategoryTea from '@/assets/user/teh-category.png';

export default function CategoryCards() {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full">
        <Link href="/" className="relative md:w-[350px] md:h-[400px] lg:w-[450px] lg:h-[500px] rounded-[20px] overflow-hidden group">
          {/* Image */}
          <Image src={CategoryKopi} alt="Kopi" className="w-full h-full object-cover" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 p-6 text-white z-10">
            <h3 className="text-2xl font-semibold mb-2">Kopi</h3>
          </div>
        </Link>
        <Link href="/" className="relative md:w-[350px] md:h-[400px] lg:w-[450px] lg:h-[500px] rounded-[20px] overflow-hidden group">
          {/* Image */}
          <Image src={CategoryNonKopi} alt="Non-Kopi" className="w-full h-full object-cover" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 p-6 text-white z-10">
            <h3 className="text-2xl font-semibold mb-2">Non-Kopi</h3>
          </div>
        </Link>
        <Link href="/" className="relative md:w-[350px] md:h-[400px] lg:w-[450px] lg:h-[500px] rounded-[20px] overflow-hidden group">
          {/* Image */}
          <Image src={CategoryTea} alt="Teh" className="w-full h-full object-cover" />

          {/* Content */}
          <div className="absolute bottom-0 left-0 p-6 text-white z-10">
            <h3 className="text-2xl font-semibold mb-2">Teh</h3>
          </div>
        </Link>
      </div>
    </div>
  );
}
