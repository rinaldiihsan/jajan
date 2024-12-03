import React from 'react';
import Link from 'next/link';

export default function page() {
  return (
    <>
      {/* Section 1 */}
      <section className="relative w-full h-screen py-[100px] md:px-6 flex bg-[url('/images/hero-tentang.png')] bg-cover bg-center bg-no-repeat min-h-screen justify-center items-center overflow-x-hidden">
        <div className="container flex flex-col gap-y-14">
          <div className="flex flex-col gap-y-5 md:gap-y-8">
            <h1 className="text-center text-white text-4xl md:text-5xl lg:text-6xl uppercase font-extrabold">Tentang Jajan</h1>
          </div>
        </div>
      </section>
    </>
  );
}