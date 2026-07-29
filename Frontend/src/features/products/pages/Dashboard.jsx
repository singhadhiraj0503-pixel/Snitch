import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { Plus, Search, ShoppingBag, User } from "lucide-react";
import { useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct";

const Dashboard = () => {
  const navigate = useNavigate();
  const { handleGetSellerProduct } = useProduct();

  const sellerProducts = useSelector((state) => state.product.sellerProducts);

  useEffect(() => {
    handleGetSellerProduct();
  }, []);

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col">
      {/* ================= NAVBAR ================= */}

      <header className="border-b border-zinc-800">
        <div className="max-w-[1700px] mx-auto h-20 px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1 className="text-4xl font-black tracking-tight">SNITCH</h1>

            <nav className="hidden lg:flex items-center gap-8 text-sm uppercase tracking-[0.2em]">
              <Link to="/">Shop</Link>

              <Link to="/">Archives</Link>

              <Link to="/">Editorial</Link>

              <Link to="/dashboard" className="underline underline-offset-4">
                Sell
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center border border-zinc-700 h-12 w-72 px-4">
              <Search size={18} className="text-zinc-500" />

              <input
                type="text"
                placeholder="Search archive..."
                className="bg-transparent flex-1 ml-3 outline-none text-sm placeholder:text-zinc-500"
              />
            </div>

            <ShoppingBag size={21} />

            <User size={21} />
          </div>
        </div>
      </header>

      {/* ================= MAIN ================= */}

      <main className="flex-1 max-w-[1700px] mx-auto w-full px-6 lg:px-10 py-12">
        <p className="uppercase tracking-[0.35em] text-xs text-zinc-400">
          Seller Dashboard / Inventory Overview
        </p>

        <h2 className="mt-3 text-5xl lg:text-7xl font-black uppercase">
          Your Collections
        </h2>

        {/* ================= DASHBOARD STATS ================= */}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mt-14">
          <div className="border border-zinc-700 bg-[#181818] p-6">
            <p className="uppercase tracking-[0.35em] text-[11px] text-zinc-400">
              Active Listings
            </p>

            <h3 className="mt-3 text-4xl font-semibold">
              {sellerProducts?.length || 0}
            </h3>
          </div>

          <div className="border border-zinc-700 bg-[#181818] p-6">
            <p className="uppercase tracking-[0.35em] text-[11px] text-zinc-400">
              Total Sales
            </p>

            <h3 className="mt-3 text-4xl font-semibold">₹45,000</h3>
          </div>

          <div className="border border-zinc-700 bg-[#181818] p-6">
            <p className="uppercase tracking-[0.35em] text-[11px] text-zinc-400">
              Pending Shipment
            </p>

            <h3 className="mt-3 text-4xl font-semibold">02</h3>
          </div>

          <div className="border border-zinc-700 bg-[#181818] p-6">
            <p className="uppercase tracking-[0.35em] text-[11px] text-zinc-400">
              Profile Status
            </p>

            <h3 className="mt-3 text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-white"></span>
              VERIFIED
            </h3>
          </div>
        </div>

        {/* ================= PRODUCTS GRID ================= */}

        <section className="mt-20">
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-12">
            {sellerProducts?.map((product) => (
              <div
                onClick={() => {
                  navigate(`/seller/product/${product._id}`);
                }}
                key={product._id}
                className="group cursor-pointer"
              >
                {/* IMAGE */}

                <div className="relative overflow-hidden border border-zinc-700 bg-[#181818] aspect-[3/4]">
                  <img
                    src={product.images?.[0]?.url}
                    alt={product.title}
                    className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
                  />

                  <div className="absolute top-4 right-4 bg-white text-black text-[10px] tracking-[0.25em] uppercase px-3 py-1">
                    Active
                  </div>
                </div>

                {/* CONTENT */}

                <div className="mt-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="text-3xl uppercase font-medium leading-none">
                      {product.title}
                    </h3>

                    <span className="text-sm uppercase tracking-[0.2em] whitespace-nowrap">
                      {product.price?.amount} {product.price?.currency}
                    </span>
                  </div>

                  <p className="mt-4 text-zinc-400 leading-7 line-clamp-2">
                    {product.description}
                  </p>

                  {/* ACTION BUTTONS */}

                  <div className="mt-8 flex items-center justify-between">
                    <span className="uppercase tracking-[0.25em] text-[10px] text-zinc-500">
                      Listed Item
                    </span>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        className="
      h-10
      px-5
      border
      border-zinc-700
      text-xs
      uppercase
      tracking-[0.2em]
      hover:border-white
      hover:bg-white
      hover:text-black
      transition-all
      duration-300
    "
                      >
                        Edit
                      </button>

                      <button
                        type="button"
                        className="
      h-10
      px-5
      border
      border-red-500/40
      text-red-400
      text-xs
      uppercase
      tracking-[0.2em]
      hover:bg-red-500
      hover:text-white
      transition-all
      duration-300
    "
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* ================= ADD NEW PRODUCT CARD ================= */}

            <Link
              to="/create-product"
              className="
group
border-2
border-dashed
border-zinc-700
hover:border-white
transition-all
duration-300
aspect-[3/4]
flex
flex-col
items-center
justify-center
bg-[#181818]
"
            >
              <div
                className="
w-20
h-20
rounded-full
border
border-zinc-700
group-hover:border-white
flex
items-center
justify-center
transition-all
"
              >
                <Plus
                  size={42}
                  className="group-hover:rotate-90 transition-transform duration-300"
                />
              </div>

              <h3 className="mt-8 text-2xl uppercase font-semibold tracking-wide">
                List New Item
              </h3>

              <p className="mt-4 px-8 text-center text-zinc-500 leading-7">
                Add another artifact to your premium collection.
              </p>
            </Link>
          </div>
        </section>

        {/* ================= FOOTER STARTS IN PART 2B ================= */}

        <footer className="mt-24 border-t border-zinc-800">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 py-8">
            <div>
              <h3 className="text-xl font-black tracking-wider">SNITCH</h3>

              <p className="mt-2 text-sm text-zinc-500">
                Curated Marketplace for Premium Fashion.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-8 uppercase tracking-[0.2em] text-xs text-zinc-500">
              <Link to="/" className="hover:text-white transition">
                Home
              </Link>

              <Link to="/dashboard" className="hover:text-white transition">
                Dashboard
              </Link>

              <Link
                to="/create-product"
                className="hover:text-white transition"
              >
                Sell
              </Link>

              <Link to="/" className="hover:text-white transition">
                Contact
              </Link>
            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-zinc-600">
              © 2026 SNITCH. All Rights Reserved.
            </p>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default Dashboard;
