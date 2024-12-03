import React from 'react';
import Link from 'next/link';
import { Mail, Lock, Coffee } from 'lucide-react';

export default function page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDF8F3] px-3 md:px-0">
      <div className="max-w-md w-full p-8 bg-white rounded-3xl shadow-xl border border-[#9F6744]/20">
        <div className="flex flex-col items-center gap-3 mb-8">
          <Coffee size={48} className="text-[#9F6744]" />
          <h2 className="text-3xl font-bold text-[#9F6744]">Selamat Datang</h2>
          <p className="text-sm text-[#5B5B5B]">Silahkan masuk ke akun Jajan kamu</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-4">
            <div className="group">
              <label className="text-sm font-medium text-[#5B5B5B]" htmlFor="email">
                Email
              </label>
              <div className="mt-1 relative">
                <Mail className="absolute top-4 left-3 h-5 w-5 text-[#9F6744]" />
                <input id="email" type="email" required className="pl-10 w-full py-3 border-2 border-[#9F6744]/20 rounded-xl focus:ring-2 focus:ring-[#9F6744] focus:border-transparent bg-[#FDF8F3]" placeholder="Masukkan email kamu" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-[#5B5B5B]" htmlFor="password">
                Kata Sandi
              </label>
              <div className="mt-1 relative">
                <Lock className="absolute top-4 left-3 h-5 w-5 text-[#9F6744]" />
                <input id="password" type="password" required className="pl-10 w-full py-3 border-2 border-[#9F6744]/20 rounded-xl focus:ring-2 focus:ring-[#9F6744] focus:border-transparent bg-[#FDF8F3]" placeholder="Masukkan kata sandi" />
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
