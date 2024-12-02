import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function page() {
  return (
    <>
      {/* Section 1 */}
      <section className="relative w-full h-screen py-[100px] md:px-6 lg:px-10 flex bg-[url('/images/hero-homepage.png')] bg-cover bg-center bg-no-repeat min-h-screen justify-center items-center overflow-x-hidden">
        <div className="flex flex-col gap-y-14">
          <div className="flex flex-col gap-y-5 md:gap-y-8">
            <h1 className="text-center text-white text-4xl md:text-5xl lg:text-6xl uppercase font-extrabold">setiap teguk, setiap cerita</h1>
            <p className="text-center text-white text-lg md:text-2xl capitalize ">temukan mood mu disini!</p>
          </div>
          <div className="flex justify-center items-center">
            <Link
              href="/belanja"
              className="flex justify-center items-center gap-x-3 bg-transparent text-white px-6 py-5 text-base md:text-lg capitalize border-2 border-white rounded-full hover:bg-white hover:text-black transition-colors duration-300"
            >
              belanja sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Section 2 */}
    </>
  );
}
