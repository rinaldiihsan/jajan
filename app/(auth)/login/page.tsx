'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Coffee } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import Cookies from 'js-cookie';

interface LoginResponse {
  status: string;
  message: string;
  data: {
    access_token: string;
    user: {
      id: number;
      username: string;
      email: string;
      role: string;
      full_name: string;
    };
  };
}

export default function Login() {
  const { toast } = useToast();
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data: LoginResponse = await response.json();

      if (data.status === 'success') {
        Cookies.set('accessToken', data.data.access_token, { expires: 1 });
        Cookies.set('userName', data.data.user.username, { expires: 1 });

        toast({
          title: 'Berhasil!',
          description: 'Login berhasil.',
        });

        // Redirect based on role
        if (data.data.user.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      } else {
        toast({
          variant: 'destructive',
          title: 'Error!',
          description: data.message || 'Username atau password salah.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: 'Terjadi kesalahan saat login.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8F3] px-3 md:px-0">
      <div className="max-w-md w-full p-8 bg-white rounded-3xl shadow-xl border border-[#9F6744]/20">
        <div className="flex flex-col items-center gap-3 mb-8">
          <Coffee size={48} className="text-[#9F6744]" />
          <h2 className="text-3xl font-bold text-[#9F6744]">Selamat Datang</h2>
          <p className="text-sm text-[#5B5B5B]">Silahkan masuk ke akun Jajan kamu</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="group">
              <label className="text-sm font-medium text-[#5B5B5B]" htmlFor="username">
                Username
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute top-4 left-3 h-5 w-5 text-[#9F6744]" />
                <input
                  id="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full py-3 border-2 border-[#9F6744]/20 rounded-xl focus:ring-2 focus:ring-[#9F6744] focus:border-transparent bg-[#FDF8F3]"
                  placeholder="Masukkan username kamu"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#5B5B5B]" htmlFor="password">
                Kata Sandi
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute top-4 left-3 h-5 w-5 text-[#9F6744]" />
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="pl-10 w-full py-3 border-2 border-[#9F6744]/20 rounded-xl focus:ring-2 focus:ring-[#9F6744] focus:border-transparent bg-[#FDF8F3]"
                  placeholder="Masukkan kata sandi"
                />
              </div>
            </div>
          </div>

          <button type="submit" className="w-full py-3 px-4 bg-[#9F6744] hover:bg-[#8A583A] text-white font-medium rounded-xl transition-colors">
            Masuk
          </button>

          <p className="text-center text-sm text-[#5B5B5B]">
            Belum punya akun?{' '}
            <Link href="/register" className="text-[#9F6744] hover:text-[#8A583A] font-medium">
              Daftar sekarang
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
