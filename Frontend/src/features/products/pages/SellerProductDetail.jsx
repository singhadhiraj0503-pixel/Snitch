import React, { useEffect, useRef, useState } from "react";
import { useProduct } from "../hooks/useProduct";
import { useParams } from "react-router";
import { Search, Camera } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const SellerProductDetail = () => {
  const { productId } = useParams();
  const { handleGetProductById, handleAddProductVariant } = useProduct();

  const [product, setProduct] = useState(null);
  const [editableProduct, setEditableProduct] = useState(null);
  const [variants, setVariants] = useState([]);
  const [selectedImage, setSelectedImage] = useState(0);
  const fileInputRef = useRef(null);

  const fetchProductDetails = async () => {
    try {
      const data = await handleGetProductById(productId);
      console.log(data);
      // setProduct(data);
      setProduct(data);

      setEditableProduct({
        ...data,
        variants:
          data.variants?.length > 0
            ? data.variants
            : [
                {
                  size: "S",
                  color: "Obsidian",
                  price: data.price.amount,
                  stock: 24,
                },
                {
                  size: "M",
                  color: "Obsidian",
                  price: data.price.amount,
                  stock: 8,
                },
                {
                  size: "L",
                  color: "Obsidian",
                  price: data.price.amount + 50,
                  stock: 0,
                },
              ],
      });

      const defaultVariants =
        data.variants?.length > 0
          ? data.variants
          : [
              {
                size: "S",
                color: "Obsidian",
                price: data.price.amount,
                stock: 24,
              },
              {
                size: "M",
                color: "Obsidian",
                price: data.price.amount,
                stock: 8,
              },
            ];

      setEditableProduct({
        ...data,
        variants: defaultVariants,
      });

      // setVariants(defaultVariants);

      const formattedVariants = defaultVariants.map((variant) => ({
        ...variant,

        size: variant.size ?? variant.attributes?.size ?? "",

        color: variant.color ?? variant.attributes?.color ?? "",

        price:
          typeof variant.price === "object"
            ? variant.price.amount
            : variant.price,

        images: variant.images ?? [],
      }));

      setVariants(formattedVariants);
    } catch (error) {
      console.error("Failed to fetch product details", error);
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const newImages = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isNew: true,
    }));

    setEditableProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...newImages],
    }));
  };

  // const addImagesToVariant = (variantIndex, files) => {
  //   const previews = Array.from(files).map((file) => ({
  //     file,
  //     url: URL.createObjectURL(file),
  //     isNew: true,
  //   }));

  //   setVariants((prev) =>
  //     prev.map((variant, i) =>
  //       i === variantIndex
  //         ? {
  //             ...variant,
  //             images: [...variant.images, ...previews],
  //           }
  //         : variant,
  //     ),
  //   );
  // };

  const handleVariantImageUpload = (index, e) => {
    const files = Array.from(e.target.files);

    if (!files.length) return;

    const previews = files.map((file) => ({
      file,
      url: URL.createObjectURL(file),
      isNew: true,
    }));

    setVariants((prev) =>
      prev.map((variant, i) =>
        i === index
          ? {
              ...variant,
              images: [...(variant.images || []), ...previews],
            }
          : variant,
      ),
    );
  };

  const handleAddVariant = () => {
    setVariants((prev) => [
      ...prev,
      {
        size: "",
        color: "",
        price: editableProduct.price.amount,
        stock: 0,
        images: [],
      },
    ]);
  };

  const updateVariantField = (index, field, value) => {
    setVariants((prev) =>
      prev.map((variant, i) =>
        i === index
          ? {
              ...variant,
              [field]: value,
            }
          : variant,
      ),
    );
  };

  const handleSaveChanges = async () => {
    try {
      const updatedProduct = {
        ...editableProduct,
        variants,
      };

      console.log("Updated Product:");
      console.log(updatedProduct);

      console.log("New Variants:");
      console.log(variants);

      console.log("Variants:", variants);
      // await handleAddProductVariant(productId, updatedProduct);
      for (const variant of variants) {
        await handleAddProductVariant(productId, variant);
      }

      setEditableProduct(updatedProduct);

      alert("Product updated successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductDetails();
  }, [productId]);

  if (!product || !editableProduct) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= PAGE ================= */}

      <main className="max-w-[1700px] mx-5 px-5 lg:px-8 py-4">
        {/* Breadcrumb */}

        <div className="flex items-center gap-3 uppercase tracking-[0.25em] text-[11px] text-zinc-500">
          <span>Dashboard</span>

          <span>&gt;</span>

          <span>Inventory</span>

          <span>&gt;</span>

          <span className="text-zinc-300">Product Detail</span>
        </div>

        {/* ================= MAIN GRID ================= */}

        <div className="grid grid-cols-1 xl:grid-cols-[58%_42%] gap-8 mt-7">
          {/* ================= LEFT PANEL ================= */}

          <div>
            {/* Main Preview */}

            <div
              className="
                relative
                overflow-hidden
                border
                border-[#343434]
                bg-[#181818]
                aspect-[4/5]
              "
            >
              <img
                src={
                  editableProduct.images?.[selectedImage]?.url ||
                  editableProduct.images?.[selectedImage]
                }
                alt={editableProduct.title}
                className="
                  w-full
                  h-full
                  object-cover
                "
              />

              {/* Zoom */}

              <button
                className="
                  absolute
                  top-6
                  right-6
                  w-10
                  h-10
                  border
                  rounded
                  cursor-pointer
                  active:scale-95
                  border-[#444]
                  bg-[#1d1d1d]
                  flex
                  items-center
                  justify-center
                  hover:border-white
                  transition
                "
              >
                <Search size={20} />
              </button>
            </div>

            {/* ================= THUMBNAILS ================= */}

            <div className="grid grid-cols-4 gap-5 mt-6">
              {editableProduct.images?.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`
                    aspect-square
                    overflow-hidden
                    border
                    transition-all
                    ${
                      selectedImage === index ? "border-white" : "border-[#333]"
                    }
                  `}
                >
                  <img
                    src={image.url || image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}

              {/* Upload Card */}

              <button
                onClick={() => fileInputRef.current.click()}
                className="
                  aspect-square
                  border
                  cursor-pointer
                  border-[#333]
                  bg-[#242424]
                  flex
                  flex-col
                  items-center
                  justify-center
                  gap-4
                  hover:border-white
                  transition
                "
              >
                <Camera size={24} />

                <span
                  className="
                    text-[11px]
                    uppercase
                    tracking-[0.22em]
                    text-zinc-300
                  "
                >
                  Upload
                </span>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={handleImageUpload}
                />
              </button>
            </div>
          </div>

          {/* ================= RIGHT PANEL ================= */}

          <div className="flex flex-col">
            {/* Header */}

            <div className="flex items-start justify-between gap-6">
              <div>
                <h1
                  className="
        text-5xl
        xl:text-6xl
        font-black
        tracking-tight
        text-white
      "
                >
                  {editableProduct.title}
                </h1>

                <p className="mt-2 text-3xl text-zinc-300 font-light">
                  ₹
                  {editableProduct.price?.amount ||
                    product.priceAmount ||
                    editableProduct.price}
                </p>
              </div>

              {/* Status */}

              <div
                className="
      border
      border-[#3a3a3a]
      bg-[#2a2a2a]
      rounded
      px-6
      py-2
      uppercase
      tracking-[0.30em]
      text-[11px]
      text-zinc-200
    "
              >
                {product.status || "Active"}
              </div>
            </div>

            {/* Description */}

            <div className="mt-5">
              <p
                className="
      text-zinc-400
      leading-9
      text-[16px]
      max-w-[620px]
    "
              >
                {editableProduct.description}
              </p>
            </div>

            {/* ================= INVENTORY CARD ================= */}

            <div
              className="
    mt-8
    rounded
    border
    border-[#373737]
    bg-[#1d1d1d]
    grid
    grid-cols-2
  "
            >
              {/* Global Stock */}

              <div className="p-8">
                <p
                  className="
        uppercase
        tracking-[0.28em]
        text-[11px]
        text-zinc-500
      "
                >
                  Global Stock
                </p>

                <h2 className="mt-3 text-5xl font-light">
                  {product.totalStock || product.stock || 142}

                  <span className="text-2xl ml-2">Units</span>
                </h2>
              </div>

              {/* Variants */}

              <div
                className="
      border-l
      border-[#373737]
      p-8
      text-right
    "
              >
                <p
                  className="
        uppercase
        tracking-[0.28em]
        text-[11px]
        text-zinc-500
      "
                >
                  Active Variants
                </p>

                <h2 className="mt-3 text-5xl font-light">
                  {editableProduct.variants?.length || 6}
                </h2>
              </div>
            </div>

            {/* ================= VARIANTS HEADER ================= */}

            <div
              className="
    flex
    items-center
    justify-between
    mt-10
    mb-4
  "
            >
              <h2 className="text-3xl font-semibold">Variants Management</h2>

              <button
                onClick={handleAddVariant}
                className="
      uppercase
      cursor-pointer
      tracking-[0.25em]
      text-xs
      text-zinc-300
      hover:text-white
      transition
    "
              >
                + Add New Variant
              </button>
            </div>

            {/* ================= VARIANTS TABLE ================= */}

            <div className="border border-[#373737] bg-[#1B1B1B] overflow-x-auto rounded">
              {/* Table Header */}

              <div
                className="
                  grid
    grid-cols-[2fr_1fr_1.3fr_1.2fr_1.5fr]
    items-center
    border-b
    border-[#373737]
    uppercase
    tracking-[0.25em]
    text-[11px]
    text-zinc-500
    px-6
    py-5
                "
              >
                <div className="px-8 py-6">Attribute</div>

                <div className="px-8 py-6">Price</div>

                <div className="px-8 py-6">Stock</div>

                <div className="px-8 py-6 text-right">Status</div>
              </div>

              {variants.map((variant, index) => {
                const stock = variant.stock ?? 0;

                const status = stock === 0 ? "out" : stock < 10 ? "low" : "in";

                return (
                  <div
                    key={index}
                    className="
                        grid
        grid-cols-[2fr_1fr_1.3fr_1.2fr_1.5fr]
        items-center
        gap-6
        px-6
        py-7
        border-b
        border-[#2F2F2F]
        last:border-none
                    "
                  >
                    {/* Attribute */}

                    <div className="space-y-3">
                      <input
                        className="
            w-full
            bg-transparent
            border
            border-[#373737]
            rounded
            px-3
            py-2
        "
                        value={variant.size}
                        placeholder="sizes"
                        onChange={(e) =>
                          updateVariantField(index, "size", e.target.value)
                        }
                      />

                      <input
                        className="
            w-full
            bg-transparent
            border
            border-[#373737]
            rounded
            px-3
            py-2
        "
                        value={variant.color}
                        placeholder="colors"
                        onChange={(e) =>
                          updateVariantField(index, "color", e.target.value)
                        }
                      />
                    </div>

                    {/* Price */}

                    <div className="flex justify-center">
                      <input
                        type="number"
                        className="
        w-24
        text-center
        bg-transparent
        border
        border-[#373737]
        rounded
        py-2
    "
                        value={variant.price}
                        onChange={(e) =>
                          updateVariantField(
                            index,
                            "price",
                            Number(e.target.value),
                          )
                        }
                      />
                    </div>

                    {/* Stock */}

                    <div className="flex justify-center">
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            updateVariantField(
                              index,
                              "stock",
                              Math.max(0, variant.stock - 1),
                            )
                          }
                          className="
                            w-5
                            h-5
                            border
                            border-[#404040]
                            flex
                            items-center
                            justify-center
                            hover:border-white
                            transition
                          "
                        >
                          -
                        </button>

                        <span className="w-10 text-center text-md font-semibold">
                          {variant.stock}
                        </span>

                        <button
                          onClick={() =>
                            updateVariantField(
                              index,
                              "stock",
                              variant.stock + 1,
                            )
                          }
                          className="
                            w-5
                            h-5
                            border
                            border-[#404040]
                            flex
                            items-center
                            justify-center
                            hover:border-white
                            transition
                          "
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="flex justify-center">
                      {status === "in" && (
                        <span
                          className="
                            px-5
                            py-2
                            border
                            border-[#0f5d43]
                            bg-[#103126]
                            text-[#37d39b]
                            uppercase
                            tracking-[0.18em]
                            text-[10px]
                          "
                        >
                          In Stock
                        </span>
                      )}

                      {status === "low" && (
                        <span
                          className="
                            px-5
                            py-2
                            border
                            border-[#7d5711]
                            bg-[#34260b]
                            text-[#f3b03b]
                            uppercase
                            tracking-[0.18em]
                            text-[10px]
                          "
                        >
                          Low Stock
                        </span>
                      )}

                      {status === "out" && (
                        <span
                          className="
                            px-5
                            py-2
                            border
                            border-[#7a1f24]
                            bg-[#351215]
                            text-[#ff6b6b]
                            uppercase
                            tracking-[0.18em]
                            text-[10px]
                          "
                        >
                          Out of Stock
                        </span>
                      )}
                    </div>

                    {/* Upload */}

                    <div className="flex justify-center">
                      <input
                        id={`variant-${index}`}
                        type="file"
                        hidden
                        multiple
                        onChange={(e) => handleVariantImageUpload(index, e)}
                      />

                      <button
                        onClick={() =>
                          document.getElementById(`variant-${index}`).click()
                        }
                        className="
            px-2
            py-1.5
            rounded
            border
            border-[#373737]
            hover:border-white
            transition
            text-sm
            cursor-pointer
            active:scale-95
        "
                      >
                        Upload
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* ================= ACTION BUTTONS ================= */}

            <div
              className="
                mt-5
                flex
                flex-col
                sm:flex-row
                gap-6
              "
            >
              {/* Save */}

              <button
                onClick={handleSaveChanges}
                className="
                  flex-1
                  h-13
                  rounded
                  cursor-pointer 
                  active:scale-95
                  bg-white
                  text-black
                  uppercase
                  tracking-[0.20em]
                  text-sm
                  font-semibold
                  hover:bg-zinc-200
                  transition-all
                  duration-300
                "
              >
                Save Changes
              </button>

              {/* Cancel */}

              <button
                className="
                  flex-1
                  h-13
                  rounded
                  cursor-pointer 
                  active:scale-95
                  border
                  border-[#3A3A3A]
                  uppercase
                  tracking-[0.20em]
                  text-sm
                  font-semibold
                  hover:border-white
                  hover:bg-[#1d1d1d]
                  transition-all
                  duration-300
                "
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ================= FOOTER ================= */}

      <footer className="border-t border-[#2A2A2A] mt-8">
        <div
          className="
            max-w-[1700px]
            mx-auto
            px-5
            lg:px-8
            py-10
            flex
            flex-col
            lg:flex-row
            items-center
            justify-between
            gap-8
          "
        >
          {/* Logo */}

          <h2
            className="
              uppercase
              tracking-[0.35em]
              text-sm
              text-zinc-300
            "
          >
            SNITCH
          </h2>

          {/* Links */}

          <div
            className="
              flex
              flex-wrap
              justify-center
              gap-10
              text-sm
              text-zinc-500
            "
          >
            <button className="hover:text-white transition">Privacy</button>

            <button className="hover:text-white transition">Terms</button>

            <button className="hover:text-white transition">
              Sustainability
            </button>

            <button className="hover:text-white transition">Contact</button>
          </div>

          {/* Copyright */}

          <p
            className="
              uppercase
              tracking-[0.20em]
              text-[11px]
              text-zinc-500
              text-center
              lg:text-right
            "
          >
            © 2026 SNITCH. ALL RIGHTS RESERVED.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SellerProductDetail;
