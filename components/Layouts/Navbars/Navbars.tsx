'use client';

import React, { use, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'usehooks-ts';
import { AnimatePresence, motion } from 'framer-motion';
import Logo from '@/assets/user/logo.png';

export default function Navbars() {
  const [toggle, setToggle] = useState(false);
  const matches = useMediaQuery('(min-width: 1024px)');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    if (!matches) {
      setToggle(false);
    }
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <nav className="absolute top-0 z-[90] flex bg-transparent w-full">
      <div className="w-full max-w-[85rem] py-5 lg:py-10 mx-auto lg:mx-7 2xl:mx-auto px-5 md:px-5 flex justify-between items-center">
        {/* Logo Mobile */}
        <div className="lg:hidden">
          <Link href="/">
            <Image src={Logo} alt="Logo" width={100} height={30} />
          </Link>
        </div>

        {/* Menu Desktop */}
        {matches && (
          <div className="flex gap-x-12 justify-between items-center w-full">
            <div className="flex flex-row gap-x-12">
              <Link href="/" className="text-white text-lg">
                Kontak
              </Link>
              <Link href="/tentang" className="text-white text-lg">
                Tentang
              </Link>
            </div>
            {/* Logo Desktop */}
            <div className="hidden lg:block">
              <Link href="/">
                <Image src={Logo} alt="Logo" width={150} height={40} className="w-40" />
              </Link>
            </div>
            <div className="flex flex-row gap-x-12">
              <Link href="/belanja" className="text-white text-lg">
                Belanja
              </Link>
              <Link href="/login" className="text-white text-lg">
                Login
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
