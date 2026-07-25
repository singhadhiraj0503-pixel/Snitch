import React from "react";
import { Link, NavLink } from "react-router";
import { Search, ShoppingBag, User } from "lucide-react";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#111111] border-b border-[#2a2a2a]">
      <div className="max-w-[1700px] mx-auto h-[68px] px-5 lg:px-7 flex items-center justify-between">
        {/* Left */}

        <div className="flex items-center gap-10">
          {/* Logo */}

          <Link
            to="/"
            className="text-[22px] font-black tracking-tight text-white"
          >
            SNITCH
          </Link>

          {/* Navigation */}

          <nav className="hidden lg:flex items-center gap-8">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `uppercase text-[11px] tracking-[0.22em] transition ${
                  isActive
                    ? "text-white underline underline-offset-4"
                    : "text-zinc-400 hover:text-white"
                }`
              }
            >
              Shop
            </NavLink>

            <NavLink
              to="/archives"
              className="uppercase text-[11px] tracking-[0.22em] text-zinc-400 hover:text-white transition"
            >
              Archives
            </NavLink>

            <NavLink
              to="/editorial"
              className="uppercase text-[11px] tracking-[0.22em] text-zinc-400 hover:text-white transition"
            >
              Editorial
            </NavLink>

            <NavLink
              to="/seller/dashboard"
              className="uppercase text-[11px] tracking-[0.22em] text-zinc-400 hover:text-white transition"
            >
              Sell
            </NavLink>
          </nav>
        </div>

        {/* Right */}

        <div className="flex items-center gap-5">
          {/* Search */}

          <div className="hidden md:flex items-center border border-[#313131] rounded h-10 w-[230px] px-3">
            <Search size={15} className="text-zinc-500" />

            <input
              type="text"
              placeholder="Search archive..."
              className="
                flex-1
                bg-transparent
                outline-none
                ml-3
                text-[12px]
                text-white
                placeholder:text-zinc-600
              "
            />
          </div>

          {/* Icons */}

          <button
            className="
              text-zinc-300
              hover:text-white
              transition
            "
          >
            <ShoppingBag size={18} />
          </button>

          <button
            className="
              text-zinc-300
              hover:text-white
              transition
            "
          >
            <User size={18} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}

      <div className="lg:hidden border-t border-[#222]">
        <div className="flex justify-center gap-7 py-3">
          <NavLink
            to="/"
            className="uppercase text-[10px] tracking-[0.2em] text-zinc-300"
          >
            Shop
          </NavLink>

          <NavLink
            to="/archives"
            className="uppercase text-[10px] tracking-[0.2em] text-zinc-500"
          >
            Archives
          </NavLink>

          <NavLink
            to="/editorial"
            className="uppercase text-[10px] tracking-[0.2em] text-zinc-500"
          >
            Editorial
          </NavLink>

          <NavLink
            to="/seller/dashboard"
            className="uppercase text-[10px] tracking-[0.2em] text-zinc-500"
          >
            Sell
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
