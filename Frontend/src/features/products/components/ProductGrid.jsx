import React from "react";
import { useSelector } from "react-redux";
import ProductCard from "./ProductCard";

const ProductGrid = () => {
  const products = useSelector((state) => state.product.products);
  const loading = useSelector((state) => state.product.loading);

  if (loading) {
    return (
      <section className="max-w-[1700px] mx-auto px-5 lg:px-7 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[4/5] bg-[#1B1B1B] border border-[#2A2A2A]" />

              <div className="mt-5 h-5 bg-[#1B1B1B] rounded" />

              <div className="mt-3 h-3 w-2/3 bg-[#1B1B1B] rounded" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return (
      <section className="max-w-[1700px] mx-auto px-5 lg:px-7 py-20 flex justify-center">
        <div className="text-center">
          <h2 className="text-3xl uppercase font-bold">No Products Found</h2>

          <p className="mt-4 text-zinc-500 tracking-wider">
            New collections will appear here.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-[1700px] mx-auto px-6 lg:px-7 pt-12 pb-14">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          gap-x-5
          gap-y-20
        "
      >
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default ProductGrid;
