import React, { useEffect, useState } from "react";
import { CheckCircle2, Shirt } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { useCart } from "../hooks/useCart";
import Footer from "../../products/components/Footer";

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { handleGetOrderDetails } = useCart();

  const queryParams = new URLSearchParams(location.search);

  const orderId = queryParams.get("order_id");

  const [loading, setLoading] = useState(true);

  const [order, setOrder] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      setLoading(true);

      const data = await handleGetOrderDetails(orderId);

      setOrder(data);
    } catch (err) {
      console.log(err);

      setError("Unable to fetch order.");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------------------ */
  /* Helper Functions                     */
  /* ------------------------------------ */

  const formatPrice = (price) => {
    if (!price) return "0 INR";

    return `${price.amount.toLocaleString()} ${price.currency}`;
  };

  const getItemImage = (item) => {
    if (item.images?.length > 0) {
      return item.images[0].url;
    }

    return "";
  };

  const getTotalItems = () => {
    if (!order?.orderItems) return 0;

    return order.orderItems.reduce((total, item) => total + item.quantity, 0);
  };

  /* ------------------------------------ */
  /* Loading                              */
  /* ------------------------------------ */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="text-white text-lg tracking-[0.25em] uppercase">
          Loading Order...
        </div>
      </div>
    );
  }

  /* ------------------------------------ */
  /* Error                                */
  /* ------------------------------------ */

  if (error) {
    return (
      <div className="min-h-screen bg-[#111111] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-white text-3xl font-semibold">
            Something went wrong
          </h2>

          <p className="text-zinc-400 mt-4">{error}</p>

          <button
            onClick={() => navigate("/")}
            className="
              mt-8
              px-8
              py-3
              bg-white
              text-black
              uppercase
              tracking-[0.2em]
              text-sm
            "
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }
  return (
    <section className="min-h-screen bg-[#111111] text-white">
      {/* Container */}

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        {/* Top Space */}

        <div className="pt-20 md:pt-28" />

        {/* Success Icon */}

        <div className="flex justify-center">
          <div
            className="
              w-20
              h-20
              rounded-full
              border-[3px]
              border-white
              flex
              items-center
              justify-center
            "
          >
            <CheckCircle2 size={42} strokeWidth={2.5} />
          </div>
        </div>

        {/* Heading */}

        <h1
          className="
            mt-8
            text-center
            uppercase
            font-semibold
            tracking-tight
            text-4xl
            md:text-6xl
          "
        >
          Order Confirmed
        </h1>

        {/* Subtitle */}

        <p
          className="
            mt-5
            text-center
            text-zinc-400
            text-base
            md:text-lg
          "
        >
          Thank you for your purchase. Your order is being processed.
        </p>

        {/* Order Card */}

        <div
          className="
            mt-16
            max-w-3xl
            mx-auto
            border
            border-[#343434]
            bg-[#1C1C1C]
          "
        >
          {/* Header */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-10
              px-10
              py-10
            "
          >
            {/* Order Id */}

            <div>
              <p
                className="
                  uppercase
                  tracking-[0.25em]
                  text-[11px]
                  text-zinc-500
                "
              >
                Order ID
              </p>

              <h3
                className="
                  mt-3
                  break-all
                  text-lg
                  text-white
                "
              >
                {order?.razorpay?.orderId}
              </h3>
            </div>

            {/* Payment Id */}

            <div>
              <p
                className="
                  uppercase
                  tracking-[0.25em]
                  text-[11px]
                  text-zinc-500
                "
              >
                Payment ID
              </p>

              <h3
                className="
                  mt-3
                  break-all
                  text-lg
                  text-white
                "
              >
                {order?.razorpay?.paymentId}
              </h3>
            </div>
          </div>

          {/* Divider */}

          <div className="border-t border-[#303030]" />
          {/* ============================= */}
          {/* Items Summary */}
          {/* ============================= */}

          <div className="px-10 py-10">
            <p
              className="
                uppercase
                tracking-[0.25em]
                text-[11px]
                text-zinc-500
                mb-8
              "
            >
              Items Summary
            </p>

            <div className="space-y-6">
              {order?.orderItems?.map((item) => (
                <div
                  key={item._id}
                  className="
                    bg-[#141414]
                    border
                    border-[#2E2E2E]
                    p-6
                    flex
                    flex-col
                    sm:flex-row
                    gap-6
                    items-start
                    sm:items-center
                  "
                >
                  {/* ================= IMAGE ================= */}

                  <div
                    className="
                      w-full
                      sm:w-28
                      h-36
                      sm:h-28
                      bg-[#242424]
                      flex
                      items-center
                      justify-center
                      overflow-hidden
                      flex-shrink-0
                    "
                  >
                    {getItemImage(item) ? (
                      <img
                        src={getItemImage(item)}
                        alt={item.title}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    ) : (
                      <div
                        className="
                          w-full
                          h-full
                          flex
                          items-center
                          justify-center
                          text-zinc-600
                        "
                      >
                        <Shirt size={34} />
                      </div>
                    )}
                  </div>

                  {/* ================= DETAILS ================= */}

                  <div className="flex-1">
                    <h3
                      className="
                        text-white
                        text-lg
                        uppercase
                        leading-8
                      "
                    >
                      {item.title}
                    </h3>

                    <p
                      className="
                        mt-2
                        text-zinc-400
                        text-sm
                      "
                    >
                      Qty : {item.quantity}
                    </p>
                  </div>

                  {/* ================= PRICE ================= */}

                  <div
                    className="
                      sm:text-right
                      w-full
                      sm:w-auto
                    "
                  >
                    <h3
                      className="
                        text-2xl
                        font-medium
                        text-white
                      "
                    >
                      {formatPrice(item.price)}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}

          <div className="border-t border-[#303030]" />

          {/* ============================= */}
          {/* Total */}
          {/* ============================= */}

          <div
            className="
              flex
              items-center
              justify-between
              px-10
              py-10
            "
          >
            <span
              className="
                text-zinc-300
                text-2xl
              "
            >
              Total Paid
            </span>

            <span
              className="
                text-4xl
                font-medium
                text-white
              "
            >
              {formatPrice(order?.price)}
            </span>
          </div>
        </div>
        {/* ================================ */}
        {/* Action Buttons */}
        {/* ================================ */}

        <div
          className="
          mt-14
          mb-24
          flex
          flex-col
          sm:flex-row
          justify-center
          gap-6
        "
        >
          {/* Continue Shopping */}

          <button
            onClick={() => navigate("/")}
            className="
            w-full
            sm:w-auto
            px-12
            py-4
            border
            border-white
            uppercase
            tracking-[0.28em]
            text-sm
            transition-all
            duration-300
            hover:bg-white
            hover:text-black
          "
          >
            Continue Shopping
          </button>

          {/* View Orders */}

          <button
            onClick={() => navigate("/orders")}
            className="
            w-full
            sm:w-auto
            px-12
            py-4
            bg-white
            text-black
            uppercase
            tracking-[0.28em]
            text-sm
            transition-all
            duration-300
            hover:bg-zinc-200
          "
          >
            View Orders
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default OrderSuccess;
