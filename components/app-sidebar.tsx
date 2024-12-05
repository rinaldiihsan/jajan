'use client';

import * as React from 'react';
import { LayoutDashboard, Tags, Coffee, ShoppingCart, LogOut, type LucideIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { NavMain } from '@/components/nav-main';
import { SimpleNavUser } from '@/components/simple-nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarRail } from '@/components/ui/sidebar';
import Link from 'next/link';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toast } = useToast();
  const router = useRouter();
  const [username, setUsername] = React.useState<string>('');

  React.useEffect(() => {
    const storedUsername = Cookies.get('userName');
    const token = Cookies.get('accessToken');

    if (!token) {
      router.push('/login');
      return;
    }

    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [router]);

  const handleLogout = () => {
    Cookies.remove('accessToken');
    Cookies.remove('userName');
    toast({
      title: 'Berhasil Logout',
      description: 'Sampai jumpa kembali!',
    });
    router.push('/login');
  };

  const data = {
    user: {
      name: username || 'Admin',
      email: 'admin@jajan.com',
      avatar: '/path/to/avatar.jpg',
    },
    navMain: [
      {
        title: 'Kategori',
        url: '/admin/categories',
        icon: Tags,
        items: [
          {
            title: 'Daftar Kategori',
            url: '/admin/categories',
          },
          {
            title: 'Tambah Kategori',
            url: '/admin/categories/create',
          },
        ],
      },
      {
        title: 'Produk',
        url: '/admin/products',
        icon: Coffee,
        items: [
          {
            title: 'Daftar Produk',
            url: '/admin/products',
          },
          {
            title: 'Tambah Produk',
            url: '/admin/products/create',
          },
        ],
      },
      {
        title: 'Pesanan',
        url: '/admin/orders',
        icon: ShoppingCart,
        items: [
          {
            title: 'Semua Pesanan',
            url: '/admin/orders',
          },
          {
            title: 'Pesanan Pending',
            url: '/admin/orders?status=pending',
          },
          {
            title: 'Pesanan Selesai',
            url: '/admin/orders?status=completed',
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/admin/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Coffee className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">JAJAN</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <SimpleNavUser user={data.user} />
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100">
          <LogOut size={15} />
          <span className="text-sm">Logout</span>
        </button>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
