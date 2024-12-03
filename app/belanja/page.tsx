import React from 'react';
import KopiCards from './_components/KopiCards';
import NonKopiCards from './_components/NonKopiCards';
import TeaCards from './_components/TeaCards';

function page() {
  return (
    <>
      {/* Section 1 */}
      <section className="relative w-full h-screen py-[100px] md:px-6 flex bg-[url('/images/hero-belanja.png')] bg-cover bg-center bg-no-repeat min-h-screen justify-center items-center overflow-x-hidden">
        <div className="container flex flex-col gap-y-14">
          <div className="flex flex-col gap-y-5 md:gap-y-8">
            <h1 className="text-center text-white text-4xl md:text-5xl lg:text-6xl uppercase font-extrabold">Belanja di Jajan</h1>
          </div>
        </div>
      </section>

      {/* Section 2 */}
      <section className="w-full py-[50px] md:py-[100px] flex flex-col" id="minuman-kopi">
        <div className="container flex flex-col gap-y-14 items-center justify-center">
          <div className="flex flex-col gap-y-2 md:gap-y-4 text-center">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl uppercase">minuman kopi</h1>
            <p className="text-[#5B5B5B] text-base md:text-lg">Racikan kopi dari biji pilihan berkualitas tinggi</p>
          </div>
          {/* Kopi Card */}
          <KopiCards />
        </div>
      </section>

      {/* Section 3 */}
      <section className="w-full py-[50px] md:py-[100px] flex flex-col" id="minuman-nonkopi">
        <div className="container flex flex-col gap-y-14 items-center justify-center">
          <div className="flex flex-col gap-y-2 md:gap-y-4 text-center">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl uppercase">minuman non kopi</h1>
            <p className="text-[#5B5B5B] text-base md:text-lg">Minuman segar berbahan dasar alami pilihan</p>
          </div>
          {/* Non Kopi Card */}
          <NonKopiCards />
        </div>
      </section>

      {/* Section 4 */}
      <section className="w-full py-[50px] md:py-[100px] flex flex-col" id="minuman-teh">
        <div className="container flex flex-col gap-y-14 items-center justify-center">
          <div className="flex flex-col gap-y-2 md:gap-y-4 text-center">
            <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl uppercase">minuman teh</h1>
            <p className="text-[#5B5B5B] text-base md:text-lg">Seduhan teh berkualitas dengan paduan rasa yang harmonis</p>
          </div>
          {/* Non Kopi Card */}
          <TeaCards />
        </div>
      </section>
    </>
  );
}

export default page;
