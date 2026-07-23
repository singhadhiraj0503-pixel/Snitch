import React, { useState } from "react";
import { Search, ShoppingBag, User, Plus, Camera } from "lucide-react";
import { useProduct } from "../hooks/useProduct";
import { useNavigate } from "react-router";

const currencies = ["INR", "USD", "EUR", "GBP", "YEN"];

const CreateProduct = () => {
  const { handleCreateProduct } = useProduct();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priceAmount: "",
    priceCurrency: "INR",
  });

  const [images, setImages] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCurrency = (currency) => {
    setFormData((prev) => ({
      ...prev,
      priceCurrency: currency,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    setImages((prev) => [...prev, ...files].slice(0, 7));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("priceAmount", formData.priceAmount);
    data.append("priceCurrency", formData.priceCurrency);

    images.forEach((img) => {
      data.append("images", img);
    });

    await handleCreateProduct(data);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col">
      {/* ======================= NAVBAR ======================= */}

      <header className="border-b border-zinc-800">
        <div className="max-w-[1700px] mx-auto h-15 px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <h1 className="text-2xl font-black tracking-tight">SNITCH</h1>

            <nav className="hidden lg:flex items-center gap-8 uppercase tracking-[0.2em] text-sm">
              <a href="#">Shop</a>

              <a href="#">Archives</a>

              <a href="#">Editorial</a>

              <a href="#" className="underline underline-offset-4">
                Sell
              </a>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center border border-zinc-700 rounded h-8 w-72 px-4">
              <Search size={18} className="text-zinc-500" />

              <input
                type="text"
                placeholder="Search archive..."
                className="bg-transparent flex-1 ml-3 outline-none text-sm placeholder:text-zinc-500"
              />
            </div>

            <ShoppingBag size={22} />

            <User size={22} />
          </div>
        </div>
      </header>

      {/* ======================= PAGE ======================= */}

      <main className="flex-1 max-w-[1700px] mx-auto w-full px-6 lg:px-10 py-4">
        <h2 className="text-5xl lg:text-5xl font-bold uppercase">
          List New Artifact
        </h2>

        <p className="uppercase tracking-[0.4em] text-xs text-zinc-400 mt-2">
          Seller Dashboard / Inventory Management
        </p>

        <form
          onSubmit={handleSubmit}
          className="grid lg:grid-cols-2 gap-16 mt-10"
        >
          {/* ================= LEFT SECTION ================= */}

          <section className="space-y-5">
            {/* PRODUCT TITLE */}

            <div>
              <label className="block uppercase tracking-[0.35em] text-xs text-zinc-300 mb-2">
                Product Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. 1998 HELMUT LANG PAINT SPLATTER DENIM"
                className="
    w-full
    h-10
    rounded
    border
    border-zinc-700
    bg-[#181818]
    px-5
    text-lg
    placeholder:text-zinc-600
    focus:outline-none
    focus:border-white
    transition
  "
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="block uppercase tracking-[0.35em] text-xs text-zinc-300 mb-2">
                Item Description
              </label>

              <textarea
                rows={9}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Detail the provenance, condition, and unique characteristics..."
                className="
    w-full
    rounded
    resize-none
    border
    border-zinc-700
    bg-[#181818]
    p-2
    text-base
    placeholder:text-zinc-600
    focus:outline-none
    focus:border-white
    transition
  "
              />
            </div>

            {/* PRICE + CURRENCY */}

            <div className="grid md:grid-cols-[1fr_auto] gap-10">
              {/* PRICE */}

              <div>
                <label className="block uppercase tracking-[0.35em] text-xs text-zinc-300 mb-2">
                  Price Amount
                </label>

                <input
                  type="number"
                  name="priceAmount"
                  value={formData.priceAmount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="
      w-full
      h-10
      rounded
      border
      border-zinc-700
      bg-[#181818]
      px-5
      text-lg
      placeholder:text-zinc-600
      focus:outline-none
      focus:border-white
      transition
    "
                />
              </div>

              {/* CURRENCY */}

              <div>
                <label className="block uppercase tracking-[0.35em] text-xs text-zinc-300 mb-2">
                  Currency
                </label>

                <div className="flex flex-wrap gap-3">
                  {currencies.map((currency) => (
                    <button
                      key={currency}
                      type="button"
                      onClick={() => handleCurrency(currency)}
                      className={`
          h-10
          w-10
          rounded
          border
          uppercase
          text-[0.7rem]
          font-black
          tracking-wider
          transition-all
          duration-300

          ${
            formData.priceCurrency === currency
              ? "bg-white text-black border-white"
              : "bg-[#181818] border-zinc-700 text-zinc-300 hover:border-white hover:text-white"
          }
        `}
                    >
                      {currency}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ================= RIGHT SECTION STARTS IN PART 2 ================= */}

          <section className="space-y-2">
            {/* IMAGE HEADER */}

            <div className="flex items-center justify-between">
              <label className="uppercase tracking-[0.35em] text-xs text-zinc-300">
                Imagery (Up To 7)
              </label>

              <span className="text-xs text-zinc-500">{images.length} / 7</span>
            </div>

            {/* PRIMARY IMAGE */}

            <label
              htmlFor="images"
              className="
  relative
  h-[250px]
  rounded
  border
  border-zinc-700
  bg-[#181818]
  flex
  items-center
  justify-center
  cursor-pointer
  overflow-hidden
  hover:border-white
  transition
"
            >
              {images[0] ? (
                <img
                  src={URL.createObjectURL(images[0])}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center text-zinc-500">
                  <Camera size={52} />

                  <span className="mt-5 uppercase tracking-[0.25em] text-xs">
                    Upload Primary View
                  </span>
                </div>
              )}
            </label>

            {/* HIDDEN FILE INPUT */}

            <input
              id="images"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={handleImageUpload}
            />

            {/* IMAGE GRID */}

            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, index) => {
                const image = images[index + 1];

                return (
                  <label
                    key={index}
                    htmlFor="images"
                    className="
        h-28
        border
        border-zinc-700
        bg-[#181818]
        flex
        items-center
        justify-center
        cursor-pointer
        overflow-hidden
        hover:border-white
        transition
      "
                  >
                    {image ? (
                      <img
                        src={URL.createObjectURL(image)}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Plus size={34} className="text-zinc-500" />
                    )}
                  </label>
                );
              })}
            </div>

            <p className="uppercase tracking-[0.25em] text-[10px] text-zinc-600">
              High Resolution JPEG or PNG. Max 10MB Per File.
            </p>

            {/* PUBLISH */}

            <button
              type="submit"
              className="
  mt-5
  w-full
  h-10
  bg-white
  text-black
  text-lg
  font-black
  rounded
  cursor-pointer
  active:scale-95
  uppercase
  hover:bg-zinc-200
  transition
"
            >
              Publish Product
            </button>

            <p className="text-center text-xs tracking-[0.2em] uppercase text-zinc-600">
              By publishing, you agree to our Seller Guidelines and Commission
              Terms.
            </p>
          </section>
        </form>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-zinc-800">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="uppercase tracking-[0.3em] text-xs text-zinc-500">
            © 2024 Snitch Archive. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center gap-8 uppercase tracking-[0.25em] text-xs text-zinc-500">
            <a href="#" className="hover:text-white transition">
              Terms
            </a>

            <a href="#" className="hover:text-white transition">
              Privacy
            </a>

            <a href="#" className="hover:text-white transition">
              Shipping
            </a>

            <a href="#" className="hover:text-white transition">
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CreateProduct;
