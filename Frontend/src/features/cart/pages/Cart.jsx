import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Heart, Trash2, Lock, ShoppingBag, Minus, Plus } from "lucide-react";
import { useCart } from "../hooks/useCart";
import Navbar from "../../products/components/Navbar";
import Footer from "../../products/components/Footer";
import { useRazorpay } from "react-razorpay";
import { useNavigate } from "react-router";

const Cart = () => {
  const navigate = useNavigate();
  /* -------------------------------------------------------------------------- */
  /*                                    HOOKS                                   */
  /* -------------------------------------------------------------------------- */

  const {
    handleGetcart,
    handleIncrementCartItem,
    handleDecrementCartItem,
    handleRemoveCartItem,
    handleCreateCartOrder,
    handleVerifyCartOrder,
  } = useCart();

  const { error, isLoading, Razorpay } = useRazorpay();
  /* -------------------------------------------------------------------------- */
  /*                                REDUX STATE                                 */
  /* -------------------------------------------------------------------------- */

  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user);

  /* -------------------------------------------------------------------------- */
  /*                                LOCAL STATE                                 */
  /* -------------------------------------------------------------------------- */

  const [loading, setLoading] = useState(true);

  /* -------------------------------------------------------------------------- */
  /*                               FETCH CART                                   */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await handleGetcart();
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                              HELPER FUNCTIONS                              */
  /* -------------------------------------------------------------------------- */

  // Returns the selected variant from the product
  const getVariant = (item) => {
    if (!item) return null;

    if (!item.product) return null;

    return item.product.variants || null;
  };

  // Display Variant Image
  // If variant image doesn't exist
  // use product image instead
  const getDisplayImage = (item) => {
    const variant = getVariant(item);

    if (variant && Array.isArray(variant.images) && variant.images.length > 0) {
      return variant.images[0].url;
    }

    if (item?.product?.images && item.product.images.length > 0) {
      return item.product.images[0].url;
    }

    return "";
  };

  // Display Variant Price
  // If variant price doesn't exist
  // use product price
  const getDisplayPrice = (item) => {
    const variant = getVariant(item);

    return variant?.price?.amount ?? item.product?.price?.amount ?? 0;
  };

  // Display Variant Size
  const getVariantSize = (item) => {
    return getVariant(item)?.attributes?.size ?? "-";
  };

  // Display Variant Color
  const getVariantColor = (item) => {
    return getVariant(item)?.attributes?.color ?? "-";
  };

  // Display Variant Stock
  const getVariantStock = (item) => {
    return getVariant(item)?.stock ?? 0;
  };

  // Currency Formatter

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN").format(amount);
  };

  /* -------------------------------------------------------------------------- */
  /*                              PRICE CALCULATIONS                            */
  /* -------------------------------------------------------------------------- */

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + getDisplayPrice(item) * item.quantity;
    }, 0);
  }, [cart]);

  const shipping = useMemo(() => {
    if (subtotal >= 5000) return 0;

    return 199;
  }, [subtotal]);

  const tax = useMemo(() => {
    return 0;
  }, []);

  const total = useMemo(() => {
    return subtotal + shipping + tax;
  }, [subtotal, shipping, tax]);

  /* -------------------------------------------------------------------------- */
  /*                           CART ACTIONS (TEMPORARY)                         */
  /* -------------------------------------------------------------------------- */

  const handleIncreaseQuantity = (item) => {
    console.log("Increase", item);
  };

  const handleDecreaseQuantity = (item) => {
    console.log("Decrease", item);
  };

  const handleRemoveItem = (item) => {
    console.log("Remove", item);
  };

  const handleMoveToWishlist = (item) => {
    console.log("Wishlist", item);
  };

  const handleCheckout = async () => {
    const order = await handleCreateCartOrder();
    console.log(order);

    const options = {
      key: "rzp_test_TLOOE4wdg3HcTG",
      amount: order.amount, // Amount in paise
      currency: order.currency,
      name: "Snitch",
      description: "Test Transaction",
      order_id: order.id, // Generate order_id on server
      handler: async (response) => {
        const isValid = await handleVerifyCartOrder(response);
        if (!isValid) {
          navigate(`/order-success?order_id=${response?.razorpay_order_id}`);
        }
      },
      prefill: {
        name: user?.fullname,
        email: user?.email,
        contact: user?.contact,
      },
      theme: {
        color: "#F37254",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  /* -------------------------------------------------------------------------- */
  /*                               LOADING STATE                                */
  /* -------------------------------------------------------------------------- */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center text-white">
        Loading Cart...
      </div>
    );
  }

  /* -------------------------------------------------------------------------- */
  /*                              EMPTY CART STATE                              */
  /* -------------------------------------------------------------------------- */

  if (!cart.length) {
    return (
      <div className="min-h-screen bg-[#111111] text-white">
        {/* <Navbar /> */}

        <div className="max-w-7xl mx-auto px-6 py-28 flex flex-col items-center justify-center">
          <ShoppingBag size={70} className="text-zinc-600" />

          <h2 className="text-4xl font-light mt-8 uppercase tracking-wide">
            Your Archive is Empty
          </h2>

          <p className="text-zinc-500 mt-4">Add products to your archive.</p>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#111111] text-white">
      {/* ===================== NAVBAR ===================== */}

      {/* <Navbar /> */}

      {/* ===================== MAIN ===================== */}

      <main className="max-w-[1600px] mx-auto px-5 sm:px-8 lg:px-10 py-12 lg:py-16">
        {/* ===================== PAGE HEADER ===================== */}

        <div className="mb-14">
          <p className="uppercase tracking-[0.35em] text-xs text-zinc-500">
            Shopping Cart
          </p>

          <h1 className="mt-4 text-4xl lg:text-6xl font-light uppercase tracking-wide">
            Your Archive
          </h1>

          <div className="mt-5 h-px bg-[#272727]" />
        </div>

        {/* ===================== GRID ===================== */}

        <div className="grid grid-cols-1 xl:grid-cols-[1fr_380px] gap-10 lg:gap-16">
          {/* ===================================================== */}
          {/*                     LEFT COLUMN                       */}
          {/* ===================================================== */}

          <section>
            {/* Title */}

            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl uppercase tracking-[0.18em] font-light">
                  Items
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  {cart.length} Item{cart.length > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            {/* ================= CART LIST ================= */}

            <div className="space-y-6">
              {cart.map((item) => {
                const variant = getVariant(item);

                const image = getDisplayImage(item);

                const stock = getVariantStock(item);

                const price = getDisplayPrice(item);

                const size = getVariantSize(item);

                const color = getVariantColor(item);

                return (
                  <div
                    key={item._id}
                    className="
                    rounded-xl
                    border
                    border-[#242424]
                    bg-[#181818]
                    p-5
                    transition-all
                    duration-300
                    hover:border-[#3a3a3a]
                  "
                  >
                    {/* ================= CARD PLACEHOLDER ================= */}

                    {/* ========================================================= */}
                    {/*                    PRODUCT CARD LAYOUT                    */}
                    {/* ========================================================= */}

                    <div className="flex flex-col lg:flex-row gap-6">
                      {/* ========================================================= */}
                      {/*                      PRODUCT IMAGE                        */}
                      {/* ========================================================= */}

                      <div className="w-full lg:w-[170px] flex-shrink-0">
                        <div
                          className="
      aspect-[3/4]
      overflow-hidden
      rounded-xl
      bg-[#222222]
      border
      border-[#2d2d2d]
    "
                        >
                          <img
                            src={image}
                            alt={item.product.title}
                            className="
        w-full
        h-full
        object-cover
        transition-transform
        duration-500
        hover:scale-105
      "
                          />
                        </div>
                      </div>

                      {/* ========================================================= */}
                      {/*                  PRODUCT INFORMATION                      */}
                      {/* ========================================================= */}

                      <div className="flex-1 flex flex-col justify-between">
                        {/* ---------------- Title ---------------- */}

                        <div>
                          <h3
                            className="
        text-2xl
        font-light
        uppercase
        tracking-wide
      "
                          >
                            {item.product.title}
                          </h3>

                          {/* Description */}

                          <p
                            className="
        mt-3
        text-sm
        text-zinc-400
        leading-7
        line-clamp-3
      "
                          >
                            {item.product.description}
                          </p>

                          {/* Category */}

                          <div className="mt-5">
                            <span
                              className="
          inline-flex
          items-center
          rounded-full
          border
          border-zinc-700
          px-4
          py-2
          text-xs
          uppercase
          tracking-[0.18em]
          text-zinc-300
        "
                            >
                              {item.product.category}
                            </span>
                          </div>

                          {/* =========================================== */}
                          {/*            VARIANT INFORMATION              */}
                          {/* =========================================== */}

                          <div className="mt-6 flex flex-wrap gap-3">
                            {/* Size */}

                            <div
                              className="
          px-4
          py-2
          rounded-lg
          bg-[#202020]
          border
          border-[#333333]
          text-sm
        "
                            >
                              <span className="text-zinc-500">Size :</span>

                              <span className="ml-2 font-medium">{size}</span>
                            </div>

                            {/* Color */}

                            <div
                              className="
          px-4
          py-2
          rounded-lg
          bg-[#202020]
          border
          border-[#333333]
          text-sm
        "
                            >
                              <span className="text-zinc-500">Color :</span>

                              <span className="ml-2 font-medium">{color}</span>
                            </div>
                          </div>

                          {/* =========================================== */}
                          {/*         DYNAMIC VARIANT ATTRIBUTES          */}
                          {/* =========================================== */}

                          {variant?.attributes &&
                            Object.keys(variant.attributes).length > 0 && (
                              <div className="mt-4 flex flex-wrap gap-3">
                                {Object.entries(variant.attributes).map(
                                  ([key, value]) => {
                                    if (key === "size" || key === "color") {
                                      return null;
                                    }

                                    return (
                                      <div
                                        key={key}
                                        className="
                      rounded-lg
                      border
                      border-[#333333]
                      bg-[#202020]
                      px-4
                      py-2
                      text-sm
                    "
                                      >
                                        <span className="text-zinc-500 capitalize">
                                          {key} :
                                        </span>

                                        <span className="ml-2">{value}</span>
                                      </div>
                                    );
                                  },
                                )}
                              </div>
                            )}

                          {/* =========================================== */}
                          {/*               STOCK STATUS                  */}
                          {/* =========================================== */}

                          <div className="mt-6">
                            {stock > 10 ? (
                              <span className="text-emerald-400 text-sm font-medium">
                                ● In Stock
                              </span>
                            ) : stock > 0 ? (
                              <span className="text-yellow-400 text-sm font-medium">
                                ● Only {stock} Left
                              </span>
                            ) : (
                              <span className="text-red-400 text-sm font-medium">
                                ● Out of Stock
                              </span>
                            )}
                          </div>
                        </div>

                        {/* ========================================================= */}
                        {/*                    BOTTOM ACTION BAR                      */}
                        {/* ========================================================= */}

                        <div className="mt-8 pt-6 border-t border-[#2b2b2b]">
                          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                            {/* ================= PRICE ================= */}

                            <div>
                              <p className="text-xs uppercase tracking-[0.25em] text-zinc-500">
                                Price
                              </p>

                              <h2 className="mt-2 text-3xl font-semibold">
                                ₹{formatCurrency(price)}
                              </h2>

                              <p className="pt-4 opacity-75 text-sm"></p>
                            </div>

                            {/* ================= ACTIONS ================= */}

                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                              {/* Quantity */}

                              <div
                                className="
              flex
              items-center
              rounded-xl
              overflow-hidden
              border
              border-[#333333]
            "
                              >
                                <button
                                  onClick={() =>
                                    handleDecrementCartItem({
                                      productId: item.product._id,
                                      variantId: item.variant,
                                    })
                                  }
                                  disabled={item.quantity <= 1}
                                  className="
                w-12
                h-12
                flex
                items-center
                justify-center
                bg-[#202020]
                hover:bg-[#2b2b2b]
                disabled:opacity-40
                transition
              "
                                >
                                  <Minus size={18} />
                                </button>

                                <div
                                  className="
                w-14
                h-12
                flex
                items-center
                justify-center
                border-x
                border-[#333333]
                bg-[#181818]
                font-medium
              "
                                >
                                  {item.quantity}
                                </div>

                                <button
                                  onClick={() =>
                                    handleIncrementCartItem({
                                      productId: item.product._id,
                                      variantId: item.variant,
                                    })
                                  }
                                  disabled={item.quantity >= stock}
                                  className="
                w-12
                h-12
                flex
                items-center
                justify-center
                bg-[#202020]
                hover:bg-[#2b2b2b]
                disabled:opacity-40
                transition
              "
                                >
                                  <Plus size={18} />
                                </button>
                              </div>

                              {/* Wishlist */}

                              <button
                                onClick={() => handleMoveToWishlist(item)}
                                className="
              h-12
              px-5
              rounded-xl
              border
              border-[#333333]
              flex
              items-center
              gap-2
              hover:border-white
              transition-all
            "
                              >
                                <Heart size={18} />

                                <span className="text-sm uppercase tracking-wider">
                                  Wishlist
                                </span>
                              </button>

                              {/* Remove */}

                              <button
                                onClick={() =>
                                  handleRemoveCartItem({
                                    productId: item.product._id,
                                    variantId: item.variant,
                                  })
                                }
                                className="
              h-12
              px-5
              rounded-xl
              cursor-pointer
              border
              border-red-500/40
              text-red-400
              flex
              items-center
              gap-2
              hover:bg-red-500/10
              transition-all
            "
                              >
                                <Trash2 size={18} />

                                <span className="text-sm uppercase tracking-wider">
                                  Remove
                                </span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ===================================================== */}
          {/*                    RIGHT COLUMN                       */}
          {/* ===================================================== */}

          <aside
            className="
            h-fit
            xl:sticky
            xl:top-24
          "
          >
            {/* ================= ORDER SUMMARY ================= */}

            <div
              className="
              rounded-2xl
              border
              border-[#242424]
              bg-[#181818]
              p-7
            "
            >
              <h2 className="text-2xl uppercase tracking-[0.18em] font-light">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Subtotal</span>

                  <span className="font-medium">
                    ₹{formatCurrency(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Shipping</span>

                  <span className="font-medium">
                    {shipping === 0 ? "FREE" : `₹${formatCurrency(shipping)}`}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-zinc-400">Tax</span>

                  <span className="font-medium">₹{formatCurrency(tax)}</span>
                </div>

                <div className="border-t border-[#2a2a2a] pt-5 flex items-center justify-between">
                  <span className="text-lg uppercase tracking-wider">
                    Total
                  </span>

                  <span className="text-2xl font-semibold">
                    ₹{formatCurrency(total)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="
                mt-10
                w-full
                h-14
                cursor-pointer
                rounded-xl
                bg-white
                text-black
                font-semibold
                uppercase
                tracking-[0.2em]
                transition-all
                duration-300
                hover:scale-[1.02]
                active:scale-95
              "
              >
                Checkout Securely
              </button>

              <div className="mt-8 flex items-start gap-3">
                <Lock size={18} className="text-zinc-500 mt-1" />

                <p className="text-sm leading-6 text-zinc-500">
                  Secure checkout with encrypted payment processing. Your
                  payment information is protected using industry-standard
                  security.
                </p>
              </div>

              <div className="mt-8 rounded-xl border border-[#2a2a2a] bg-[#141414] p-5">
                <h3 className="uppercase tracking-[0.18em] text-sm text-zinc-300">
                  Complimentary Benefits
                </h3>

                <ul className="mt-5 space-y-3 text-sm text-zinc-500">
                  <li>• Free shipping above ₹5,000</li>

                  <li>• Easy 7-day returns</li>

                  <li>• Premium quality assurance</li>

                  <li>• Secure online payment</li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
