'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from 'usehooks-ts';
import Logo from '@/assets/user/logo.png';
import { User, LogOut, ShoppingBag, User2Icon } from 'lucide-react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function Navbars() {
  const [toggle, setToggle] = useState(false);
  const matches = useMediaQuery('(min-width: 1024px)');
  const [isClient, setIsClient] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    if (!matches) {
      setToggle(false);
    }
    setIsClient(true);
    const token = Cookies.get('accessToken');
    const storedUsername = Cookies.get('userName');
    setIsLoggedIn(!!token);
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [matches]);

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('userName');
    setIsLoggedIn(false);
    toast({
      title: 'Berhasil Logout',
      description: 'Sampai jumpa kembali!',
    });
    router.push('/login');
  };

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
            <div className="flex flex-row gap-x-12 items-center">
              <Link href="/belanja" className="text-white text-lg">
                Belanja
              </Link>
              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#9F6744] p-2 rounded-full transition-colors flex items-center gap-2">
                      <User size={24} />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 mt-4" align="center">
                    <DropdownMenuItem asChild>
                      <Link href="/user" className="flex items-center cursor-pointer">
                        <User2Icon size={16} className="mr-2" />
                        <span>Detail User</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/order/orderan" className="flex items-center cursor-pointer">
                        <ShoppingBag size={16} className="mr-2" />
                        <span>Orderan</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 focus:text-red-600 focus:bg-red-50">
                      <LogOut size={16} className="mr-2" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/login" className="text-white text-lg">
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
