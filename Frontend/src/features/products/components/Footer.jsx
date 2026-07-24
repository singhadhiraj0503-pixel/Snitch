import React from "react";
import { Link } from "react-router";
// import { Instagram, Twitter, Globe, Youtube, ArrowUpRight } from "lucide-react";
import {
  RiInstagramFill,
  RiTwitterFill,
  RiFacebookFill,
  RiYoutubeFill,
} from "@remixicon/react";
import { ArrowUpRight } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#111111] border-t border-[#2A2A2A]">
      <div className="max-w-[1700px] mx-auto px-5 lg:px-7 py-7">
        {/* Top */}

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Brand */}

          <div>
            <h2 className="text-4xl font-black tracking-tight text-white">
              SNITCH
            </h2>

            <p className="mt-6 text-zinc-500 leading-8 max-w-sm">
              A premium destination for contemporary fashion, timeless
              silhouettes and carefully curated collections.
            </p>
          </div>

          {/* Shop */}

          <div>
            <h3 className="uppercase tracking-[0.28em] text-[11px] text-white">
              Shop
            </h3>

            <div className="mt-6 flex flex-col gap-4 text-zinc-500">
              <Link className="hover:text-white transition" to="/">
                New Arrivals
              </Link>

              <Link className="hover:text-white transition" to="/">
                Best Sellers
              </Link>

              <Link className="hover:text-white transition" to="/">
                Apparel
              </Link>

              <Link className="hover:text-white transition" to="/">
                Accessories
              </Link>
            </div>
          </div>

          {/* Company */}

          <div>
            <h3 className="uppercase tracking-[0.28em] text-[11px] text-white">
              Company
            </h3>

            <div className="mt-6 flex flex-col gap-4 text-zinc-500">
              <Link className="hover:text-white transition" to="/">
                About
              </Link>

              <Link className="hover:text-white transition" to="/">
                Careers
              </Link>

              <Link className="hover:text-white transition" to="/">
                Contact
              </Link>

              <Link className="hover:text-white transition" to="/">
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* Newsletter */}

          <div>
            <h3 className="uppercase tracking-[0.28em] text-[11px] text-white">
              Stay Updated
            </h3>

            <p className="mt-6 text-zinc-500 leading-7">
              Subscribe to receive updates about new collections and exclusive
              releases.
            </p>

            <div className="mt-8 flex">
              <input
                type="email"
                placeholder="Email Address"
                className="
                  flex-1
                  h-10
                  rounded
                  bg-transparent
                  border
                  border-[#333]
                  border-r-0
                  px-4
                  outline-none
                  placeholder:text-zinc-600
                "
              />

              <button
                className="
                  w-14
                  border
                  border-[#333]
                  flex
                  items-center
                  justify-center
                  hover:bg-white
                  hover:text-black
                  transition
                "
              >
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Divider */}

        <div className="border-t border-[#2A2A2A] mt-20 pt-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Copyright */}

            <p className="text-zinc-500 text-sm text-center lg:text-left">
              © {new Date().getFullYear()} SNITCH. All Rights Reserved.
            </p>

            {/* Social */}

            <div className="flex items-center gap-6">
              <a href="#" className="text-zinc-500 hover:text-white transition">
                {/* <Instagram size={19} /> */}
                <RiInstagramFill size={18} />
              </a>

              <a href="#" className="text-zinc-500 hover:text-white transition">
                {/* <Twitter size={19} /> */}
                <RiTwitterFill size={18} />
              </a>

              <a href="#" className="text-zinc-500 hover:text-white transition">
                {/* <Globe size={19} /> */}
                <RiFacebookFill size={18} />
              </a>

              <a href="#" className="text-zinc-500 hover:text-white transition">
                {/* <Youtube size={19} /> */}
                <RiYoutubeFill size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
