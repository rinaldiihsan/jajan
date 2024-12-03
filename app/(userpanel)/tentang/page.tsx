import React from 'react';
import Link from 'next/link';
import { Coffee, Heart, Sparkles, Clock } from 'lucide-react';

export default function page() {
  return (
    <>
      {/* Section 1 - Hero */}
      <section className="relative w-full h-screen py-[100px] md:px-6 flex bg-[url('/images/hero-tentang.png')] bg-cover bg-center bg-no-repeat min-h-screen justify-center items-center overflow-hidden">
        <div className="container flex flex-col gap-y-14 overflow-hidden">
          <div className="flex flex-col gap-y-5 md:gap-y-8 overflow-hidden">
            <h1 className="text-center text-white text-4xl md:text-5xl lg:text-6xl uppercase font-extrabold">Tentang Jajan</h1>
          </div>
        </div>
      </section>

      {/* Section 2 - Story */}
      <section className="w-full py-[50px] md:py-[100px] flex flex-col">
        <div className="container flex flex-col gap-y-14 items-center justify-center">
          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl uppercase">sedikit cerita, beribu makna</h1>
          <p className="text-[#5B5B5B] text-base md:text-lg text-center">
            Jajan adalah tempat dimana kamu bisa menemukan berbagai macam minuman yang bisa menemanimu dalam berbagai suasana. Kami menyediakan berbagai macam minuman yang bisa kamu nikmati, mulai dari kopi, teh, hingga minuman segar
            lainnya. Jajan juga menyediakan berbagai macam kategori minuman yang bisa kamu pilih sesuai dengan mood yang kamu inginkan. Jadi, tunggu apalagi? Ayo temukan mood mu disini!
          </p>
        </div>
      </section>

      {/* Section 3 - Values */}
      <section className="w-full py-[50px] bg-white">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <Coffee size={48} className="text-[#9F6744] mb-4" />
              <h3 className="text-xl font-bold mb-2 uppercase">Kualitas Terbaik</h3>
              <p className="text-gray-600">Kami hanya menggunakan bahan-bahan berkualitas tinggi untuk setiap minuman yang kami sajikan.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <Heart size={48} className="text-[#9F6744] mb-4" />
              <h3 className="text-xl font-bold mb-2 uppercase">Pelayanan Prima</h3>
              <p className="text-gray-600">Tim kami selalu siap memberikan pelayanan terbaik dengan keramahan dan profesionalisme.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <Sparkles size={48} className="text-[#9F6744] mb-4" />
              <h3 className="text-xl font-bold mb-2 uppercase">Inovasi Tanpa Henti</h3>
              <p className="text-gray-600">Kami terus berinovasi untuk menghadirkan menu-menu baru yang unik dan menarik.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4 - Statistics */}
      <section className="w-full py-[50px] bg-[#9F6744] text-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h2 className="text-4xl font-bold mb-2">50+</h2>
              <p>Varian Menu</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-2">5+</h2>
              <p>Cabang</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-2">100+</h2>
              <p>Pelanggan Setia</p>
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-2">2+</h2>
              <p>Tahun Perjalanan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 5 - CTA */}
      <section className="w-full py-[100px] bg-gray-900 text-white">
        <div className="container text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 uppercase">Bergabung dengan Keluarga Jajan</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">Dapatkan pengalaman menikmati minuman terbaik dan berbagai penawaran menarik dengan bergabung bersama kami.</p>
          <Link href="/menu" className="inline-block bg-[#9F6744] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#8A583A] transition-colors">
            Lihat Menu Kami
          </Link>
        </div>
      </section>
    </>
  );
}
