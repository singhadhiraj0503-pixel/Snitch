import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  Heart,
  Minus,
  Plus,
  Star,
  Truck,
  ShieldCheck,
  RotateCcw,
  ChevronDown,
} from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useProduct } from "../hooks/useProduct";

const ProductDetail = () => {
  const { productId } = useParams();

  const { handleGetProductById } = useProduct();

  const [product, setProduct] = useState(null);

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] = useState(0);

  // const [selectedSize, setSelectedSize] = useState("M");

  const [quantity, setQuantity] = useState(1);

  const [openSection, setOpenSection] = useState("description");

  const fetchProduct = async () => {
    try {
      const data = await handleGetProductById(productId);

      setProduct(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (!product) return;

    if (product.variants?.length > 0) {
      const firstVariant = product.variants[0];

      setSelectedVariant(firstVariant);

      setSelectedAttributes(firstVariant.attributes || {});
    }
  }, [product]);

  const displayProduct = {
    ...product,

    price: selectedVariant?.price ?? product?.price,

    images: selectedVariant?.images?.length
      ? selectedVariant.images
      : product?.images,

    stock: selectedVariant?.stock ?? 0,

    attributes: selectedVariant?.attributes ?? {},
  };

  const attributeGroups = {};

  product?.variants?.forEach((variant) => {
    Object.entries(variant.attributes || {}).forEach(([key, value]) => {
      if (!attributeGroups[key]) {
        attributeGroups[key] = new Set();
      }

      attributeGroups[key].add(value);
    });
  });

  Object.keys(attributeGroups).forEach((key) => {
    attributeGroups[key] = [...attributeGroups[key]];
  });

  const handleAttributeSelect = (name, value) => {
    const updatedAttributes = {
      ...selectedAttributes,
      [name]: value,
    };

    setSelectedAttributes(updatedAttributes);

    const variant = product.variants.find((variant) => {
      return Object.entries(updatedAttributes).every(
        ([key, val]) => variant.attributes?.[key] === val,
      );
    });

    if (variant) {
      setSelectedVariant(variant);

      setSelectedImage(0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center text-white">
        Product not found.
      </div>
    );
  }

  console.log(product);

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= PAGE WRAPPER ================= */}

      <main className="max-w-[1700px] mx-auto px-5 lg:px-8 py-3">
        {/* Breadcrumb */}

        <div className="flex items-center gap-3 uppercase tracking-[0.22em] text-[11px] text-zinc-500">
          <span>Home</span>

          <span>/</span>

          <span>Shop</span>

          <span>/</span>

          <span className="text-zinc-300">{product.title}</span>
        </div>

        {/* ================= MAIN GRID STARTS HERE ================= */}

        <div className="grid grid-cols-1 lg:grid-cols-[58%_42%] gap-8 mt-10">
          {/* ================= LEFT IMAGE GALLERY ================= */}

          <div>
            <div className="grid grid-cols-[120px_1fr] gap-5">
              {/* Thumbnail Images */}

              <div className="flex flex-col gap-4">
                {displayProduct.images?.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`
          overflow-hidden
          border
          transition-all
          duration-300
          aspect-[3/4]
          ${selectedImage === index ? "border-white" : "border-[#2A2A2A]"}
        `}
                  >
                    <img
                      src={image.url || image}
                      alt={`Thumbnail ${index + 1}`}
                      className="
            w-full
            h-full
            object-cover
            hover:scale-105
            transition-transform
            duration-500
          "
                    />
                  </button>
                ))}
              </div>

              {/* Main Image */}

              <div
                className="
      relative
      overflow-hidden
      border
      border-[#2A2A2A]
      bg-[#181818]
      aspect-[4/5]
    "
              >
                <img
                  src={
                    displayProduct.images?.[selectedImage]?.url ||
                    displayProduct.images?.[selectedImage]
                  }
                  alt={product.title}
                  className="
        w-full
        h-full
        object-cover
        transition-transform
        duration-700
        hover:scale-105
      "
                />

                {/* Wishlist */}

                <button
                  className="
        absolute
        top-5
        right-5
        w-12
        h-12
        rounded-full
        bg-black/40
        backdrop-blur-md
        border
        border-[#3A3A3A]
        flex
        items-center
        justify-center
        hover:bg-white
        hover:text-black
        transition
      "
                >
                  <Heart size={18} />
                </button>
              </div>
            </div>

            {/* Product Highlights */}

            <div className="grid grid-cols-3 gap-5 mt-4">
              <div className="border border-[#2A2A2A] py-5 text-center rounded">
                <Truck size={20} className="mx-auto mb-3 text-zinc-300" />

                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                  Free Shipping
                </p>
              </div>

              <div className="border border-[#2A2A2A] py-5 text-center rounded">
                <RotateCcw size={20} className="mx-auto mb-3 text-zinc-300" />

                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                  Easy Returns
                </p>
              </div>

              <div className="border border-[#2A2A2A] py-5 text-center rounded">
                <ShieldCheck size={20} className="mx-auto mb-3 text-zinc-300" />

                <p className="text-[11px] uppercase tracking-[0.22em] text-zinc-400">
                  Secure Checkout
                </p>
              </div>
            </div>
          </div>

          {/* ================= RIGHT PRODUCT INFO ================= */}

          <div className="sticky top-24 h-fit">
            {/* Collection */}

            <p className="uppercase tracking-[0.35em] text-[11px] text-zinc-500">
              Premium Collection
            </p>

            {/* Product Title */}

            <h1
              className="
                mt-1.5
                text-4xl
                md:text-5xl
                xl:text-6xl
                font-black
                uppercase
                leading-none
                tracking-[-0.04em]
                text-white
              "
            >
              {product.title}
            </h1>

            {/* Rating */}

            <div className="flex items-center gap-4 mt-2.5">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={18}
                    fill="#ffffff"
                    strokeWidth={1.5}
                    className="text-white"
                  />
                ))}
              </div>

              <span className="text-sm text-zinc-400">4.9 (214 Reviews)</span>
            </div>

            {/* Price */}

            <div className="mt-5.5 flex items-end gap-4">
              <span className="text-5xl font-semibold tracking-tight">
                ₹
                {displayProduct.price?.amount ||
                  displayProduct.priceAmount ||
                  displayProduct.price}
              </span>

              <span className="text-xl text-zinc-500 line-through">
                ₹
                {Math.round(
                  (displayProduct.price?.amount ||
                    product.priceAmount ||
                    displayProduct.price) * 1.35,
                )}
              </span>

              <span
                className="
                  px-3
                  py-1
                  text-[11px]
                  uppercase
                  tracking-[0.25em]
                  border
                  border-green-500/40
                  text-green-400
                "
              >
                25% OFF
              </span>
            </div>

            {/* Divider */}

            <div className="border-t border-[#2A2A2A] my-5" />

            {/* Description */}

            <div>
              <h3
                className="
                  uppercase
                  tracking-[0.25em]
                  text-[11px]
                  text-zinc-400
                "
              >
                Description
              </h3>

              <p
                className="
                  mt-5
                  text-[15px]
                  leading-8
                  text-zinc-400
                "
              >
                {product.description}
              </p>
            </div>

            {/* Product Details */}

            <div className="mt-10 grid grid-cols-2 gap-y-6">
              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-[0.25em]">
                  Category
                </p>

                <p className="mt-2 text-white">
                  {product.category?.name ||
                    product.category ||
                    "Premium Apparel"}
                </p>
              </div>

              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-[0.25em]">
                  Brand
                </p>

                <p className="mt-2 text-white">SNITCH</p>
              </div>

              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-[0.25em]">
                  Material
                </p>

                <p className="mt-2 text-white">Premium Cotton</p>
              </div>

              <div>
                <p className="text-zinc-500 text-xs uppercase tracking-[0.25em]">
                  Availability
                </p>

                {/* <p className="mt-2 text-green-400">In Stock</p> */}
                <p className="mt-2 text-white">
                  {displayProduct.stock > 0
                    ? `${displayProduct.stock} in stock`
                    : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* ================= SIZE ================= */}

            <div className="mt-12">
              <div className="flex items-center justify-between">
                <p className="uppercase tracking-[0.25em] text-[11px] text-zinc-400">
                  Select Size
                </p>

                <button className="text-xs uppercase tracking-[0.18em] px-4 text-zinc-500 hover:text-white transition">
                  Size Guide
                </button>
              </div>

              <div className="grid grid-cols-5 gap-3 mt-2 mr-5">
                {/* {["XS", "S", "M", "L", "XL"].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`
        h-10
        border
        uppercase
        text-sm
        tracking-[0.18em]
        transition-all
        duration-300
        ${
          selectedSize === size
            ? "bg-white text-black border-white"
            : "border-[#2A2A2A] text-zinc-300 hover:border-white"
        }
      `}
                  >
                    {size}
                  </button>
                ))} */}

                {attributeGroups.size?.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleAttributeSelect("size", size)}
                    className={`
        h-10
        border
        uppercase
        ${
          selectedAttributes.size === size
            ? "bg-white text-black"
            : "border-[#2A2A2A]"
        }
    `}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= COLOR ================= */}

            <div className="mt-12">
              <p className="uppercase tracking-[0.25em] text-[11px] text-zinc-400">
                Available Colors
              </p>

              <div className="flex items-center gap-4 mt-5">
                {/* <button className="w-10 h-10 rounded-full bg-black border-2 border-white" />

                <button className="w-10 h-10 rounded-full bg-zinc-500 border border-[#333]" />

                <button className="w-10 h-10 rounded-full bg-white border border-[#333]" /> */}

                {attributeGroups.color?.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleAttributeSelect("color", color)}
                    className={`
        px-4
        py-2
        border
        rounded
        ${
          selectedAttributes.color === color
            ? "border-white"
            : "border-[#2A2A2A]"
        }
    `}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* ================= QUANTITY ================= */}

            <div className="mt-12">
              <p className="uppercase tracking-[0.25em] text-[11px] text-zinc-400">
                Quantity
              </p>

              <div
                className="
    mt-5
    flex
    items-center
    justify-between
    w-44
    h-14
    border
    border-[#2A2A2A]
  "
              >
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-14 h-full flex items-center justify-center hover:bg-[#1A1A1A] transition"
                >
                  <Minus size={18} />
                </button>

                <span className="text-lg font-medium">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-14 h-full flex items-center justify-center hover:bg-[#1A1A1A] transition"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* ================= ACTION BUTTONS ================= */}

            <div className="mt-8 space-y-4 mr-5">
              <button
                className="
    w-full
    h-16
    border
    rounded
    cursor-pointer
    active:scale-95
    border-white
    uppercase
    tracking-[0.28em]
    text-sm
    hover:bg-white
    hover:text-black
    transition-all
    duration-300
  "
              >
                Add To Cart
              </button>

              <button
                className="
    w-full
    h-16
    rounded
    cursor-pointer
    active:scale-95
    bg-white
    text-black
    uppercase
    tracking-[0.28em]
    text-sm
    hover:bg-zinc-200
    transition-all
    duration-300
  "
              >
                Buy Now
              </button>
            </div>

            {/* ================= EXTRA INFO ================= */}

            <div className="mt-7 space-y-6 border-t border-[#2A2A2A] pt-7">
              <div className="flex items-start gap-4">
                <Truck size={20} className="text-zinc-400 mt-1" />

                <div>
                  <h4 className="uppercase text-xs tracking-[0.22em]">
                    Free Delivery
                  </h4>

                  <p className="mt-2 text-sm text-zinc-500 leading-7">
                    Complimentary shipping on all premium orders.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <RotateCcw size={20} className="text-zinc-400 mt-1" />

                <div>
                  <h4 className="uppercase text-xs tracking-[0.22em]">
                    Easy Returns
                  </h4>

                  <p className="mt-2 text-sm text-zinc-500 leading-7">
                    Return within 14 days if the product is unused.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <ShieldCheck size={20} className="text-zinc-400 mt-1" />

                <div>
                  <h4 className="uppercase text-xs tracking-[0.22em]">
                    Secure Payments
                  </h4>

                  <p className="mt-2 text-sm text-zinc-500 leading-7">
                    Your payment information is encrypted and protected.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================= PRODUCT INFORMATION ================= */}

        <section className="mt-10 border-t border-[#2A2A2A]">
          {/* Description */}

          <div className="border-b border-[#2A2A2A]">
            <button
              onClick={() =>
                setOpenSection(
                  openSection === "description" ? "" : "description",
                )
              }
              className="
                w-full
                py-7
                flex
                items-center
                justify-between
                uppercase
                tracking-[0.22em]
                text-sm
              "
            >
              <span>Product Description</span>

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  openSection === "description" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSection === "description" && (
              <div className="pb-8 text-zinc-400 leading-8 text-[15px]">
                <p>{product.description}</p>
              </div>
            )}
          </div>

          {/* Material */}

          <div className="border-b border-[#2A2A2A]">
            <button
              onClick={() =>
                setOpenSection(openSection === "material" ? "" : "material")
              }
              className="
                w-full
                py-7
                flex
                items-center
                justify-between
                uppercase
                tracking-[0.22em]
                text-sm
              "
            >
              <span>Material & Care</span>

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  openSection === "material" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSection === "material" && (
              <div className="pb-8">
                <ul className="space-y-3 text-zinc-400 leading-7">
                  <li>• Premium 100% Cotton Fabric</li>

                  <li>• Soft brushed interior</li>

                  <li>• Machine wash cold</li>

                  <li>• Wash with similar colours</li>

                  <li>• Do not bleach</li>

                  <li>• Tumble dry low</li>

                  <li>• Warm iron if required</li>
                </ul>
              </div>
            )}
          </div>

          {/* Shipping */}

          <div className="border-b border-[#2A2A2A]">
            <button
              onClick={() =>
                setOpenSection(openSection === "shipping" ? "" : "shipping")
              }
              className="
                w-full
                py-7
                flex
                items-center
                justify-between
                uppercase
                tracking-[0.22em]
                text-sm
              "
            >
              <span>Shipping & Returns</span>

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  openSection === "shipping" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSection === "shipping" && (
              <div className="pb-8 text-zinc-400 leading-8">
                <p>
                  Free standard shipping on all orders. Orders are processed
                  within 24 hours and delivered within 3–7 business days
                  depending on your location.
                </p>

                <p className="mt-5">
                  Returns are accepted within 14 days provided the product
                  remains unused with original packaging and tags attached.
                </p>
              </div>
            )}
          </div>

          {/* Sustainability */}

          <div className="border-b border-[#2A2A2A]">
            <button
              onClick={() =>
                setOpenSection(
                  openSection === "sustainability" ? "" : "sustainability",
                )
              }
              className="
                w-full
                py-7
                flex
                items-center
                justify-between
                uppercase
                tracking-[0.22em]
                text-sm
              "
            >
              <span>Sustainability</span>

              <ChevronDown
                size={18}
                className={`transition-transform duration-300 ${
                  openSection === "sustainability" ? "rotate-180" : ""
                }`}
              />
            </button>

            {openSection === "sustainability" && (
              <div className="pb-8 text-zinc-400 leading-8">
                <p>
                  This product is manufactured using responsibly sourced fabrics
                  and environmentally conscious production methods to reduce
                  water usage and carbon emissions while maintaining premium
                  quality standards.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* ================= RELATED PRODUCTS ================= */}

        <section className="mt-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <p className="uppercase tracking-[0.32em] text-[11px] text-zinc-500">
                Discover More
              </p>

              <h2 className="mt-3 text-4xl font-black uppercase tracking-tight">
                You May Also Like
              </h2>
            </div>

            <button
              className="
      border-2
      rounded
      border-[#2A2A2A]
      px-8
      py-3
      uppercase
      tracking-[0.22em]
      text-xs
      hover:border-white
      transition
    "
            >
              View All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                {/* Product Image */}

                <div
                  className="
          relative
          overflow-hidden
          bg-[#181818]
          border
          border-[#2A2A2A]
          aspect-[3/4]
        "
                >
                  <img
                    src={
                      displayProduct.images?.[0]?.url ||
                      displayProduct.images?.[0]
                    }
                    alt={product.title}
                    className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            group-hover:scale-105
          "
                  />

                  <span
                    className="
            absolute
            top-4
            left-4
            bg-black/70
            backdrop-blur
            px-3
            py-1
            text-[10px]
            uppercase
            tracking-[0.22em]
          "
                  >
                    New
                  </span>
                </div>

                {/* Product Info */}

                <div className="mt-5">
                  <h3
                    className="
            uppercase
            tracking-wide
            font-semibold
            text-sm
          "
                  >
                    {product.title}
                  </h3>

                  <p
                    className="
            mt-2
            text-zinc-500
            text-sm
          "
                  >
                    Premium Collection
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <span className="text-lg font-semibold">
                      ₹
                      {displayProduct.price?.amount ||
                        displayProduct.priceAmount ||
                        displayProduct.price}
                    </span>

                    <span className="text-zinc-500 line-through">
                      ₹
                      {Math.round(
                        (displayProduct.price?.amount ||
                          displayProduct.priceAmount ||
                          displayProduct.price) * 1.35,
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* ================= FOOTER ================= */}

      <Footer />
    </div>
  );
};

export default ProductDetail;
