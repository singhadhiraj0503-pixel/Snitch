import React from "react";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="w-full">
      <div className="max-w-[1700px] mx-auto px-5 lg:px-7 pt-12 lg:pt-5">
        <div className="flex flex-col xl:flex-row xl:items-end xl:justify-between gap-10">
          {/* LEFT */}

          <div>
            <p className="text-[12px] uppercase tracking-[0.38em] text-zinc-500">
              Season 04 / Drop 12
            </p>

            <h1 className="mt-3 text-[58px] md:text-[72px] xl:text-[82px] leading-none font-black uppercase tracking-[-0.05em] text-[#F3F3F3]">
              Latest
              <br className="sm:hidden" /> Drops
            </h1>
          </div>

          {/* RIGHT */}

          <div className="flex flex-wrap items-center gap-6 lg:gap-8 uppercase text-[11px] tracking-[0.22em]">
            <button className="text-white hover:opacity-100 transition">
              All
            </button>

            <button className="text-zinc-500 hover:text-white transition">
              Apparel
            </button>

            <button className="text-zinc-500 hover:text-white transition">
              Objects
            </button>

            <div className="hidden md:block h-4 w-px bg-zinc-700" />

            <button className="flex items-center gap-2 text-zinc-400 hover:text-white transition">
              Sort By: Price (Low)
              <ChevronDown size={14} strokeWidth={1.7} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
