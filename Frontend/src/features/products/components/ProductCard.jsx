import React from "react";

const ProductCard = ({ product }) => {
  const image =
    product?.images?.[0]?.url ||
    product?.images?.[0] ||
    "https://placehold.co/600x800/1a1a1a/666666?text=No+Image";

  const price =
    product?.price?.amount ?? product?.priceAmount ?? product?.price ?? 0;

  const currency = product?.price?.currency ?? product?.priceCurrency ?? "₹";

  const subtitle =
    product?.category?.name || product?.category || "Premium Collection";

  return (
    <article className="group cursor-pointer">
      {/* Image */}

      <div className="relative rounded overflow-hidden border border-[#2A2A2A] bg-[#181818] aspect-[4/5]">
        <img
          src={image}
          alt={product?.title}
          className="
            w-full
            h-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
        />
      </div>

      {/* Content */}

      <div className="mt-5">
        <div className="flex items-start justify-between gap-4">
          <h3
            className="
              uppercase
              text-[19px]
              lg:text-[21px]
              leading-tight
              tracking-[-0.02em]
              text-[#F5F5F5]
            "
          >
            {product?.title}
          </h3>

          <span
            className="
              whitespace-nowrap
              text-[18px]
              text-zinc-200
            "
          >
            {currency}
            {Number(price).toLocaleString()}
          </span>
        </div>

        <p
          className="
            mt-2
            uppercase
            tracking-[0.18em]
            text-[11px]
            text-zinc-500
          "
        >
          {subtitle}
        </p>
      </div>
    </article>
  );
};

export default ProductCard;
