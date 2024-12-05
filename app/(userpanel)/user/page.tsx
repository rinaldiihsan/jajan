'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { User as UserIcon, Mail, Phone } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface UserDetail {
  id: number;
  username: string;
  email: string;
  full_name: string;
  phone: string | null;
}

export default function UserDetail() {
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const router = useRouter();

  useEffect(() => {
    const fetchUserDetail = async () => {
      const username = Cookies.get('userName');
      const token = Cookies.get('accessToken');

      if (!username || !token) {
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/user/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (data.status === 'success') {
          setUserDetail(data.data);
        } else {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Gagal memuat data user',
          });
        }
      } catch (error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Terjadi kesalahan saat memuat data',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetail();
  }, [router, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#9F6744]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#9F6744]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#9F6744] pt-40 px-4 md:px-0">
      <div className="max-w-2xl mx-auto bg-[#FDF8F3] rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-[#9F6744] mb-8 text-center">Profil Pengguna</h1>

        <div className="space-y-6">
          <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-[#9F6744]/20">
            <UserIcon className="w-6 h-6 text-[#9F6744]" />
            <div>
              <p className="text-sm text-gray-500">Username</p>
              <p className="font-medium">{userDetail?.username}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-[#9F6744]/20">
            <UserIcon className="w-6 h-6 text-[#9F6744]" />
            <div>
              <p className="text-sm text-gray-500">Nama Lengkap</p>
              <p className="font-medium">{userDetail?.full_name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-[#9F6744]/20">
            <Mail className="w-6 h-6 text-[#9F6744]" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-medium">{userDetail?.email}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 p-4 bg-white rounded-xl border border-[#9F6744]/20">
            <Phone className="w-6 h-6 text-[#9F6744]" />
            <div>
              <p className="text-sm text-gray-500">Nomor Telepon</p>
              <p className="font-medium">{userDetail?.phone || '-'}</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button className="w-full py-3 px-4 bg-[#9F6744] hover:bg-[#8A583A] text-white font-medium rounded-xl transition-colors" onClick={() => router.back()}>
            Kembali
          </button>
        </div>
      </div>
    </div>
  );
}
