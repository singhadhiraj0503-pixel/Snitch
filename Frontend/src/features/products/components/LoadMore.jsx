import React from "react";

const LoadMore = ({
  shown = 8,
  total = 144,
  hasMore = true,
  onLoadMore,
  loading = false,
}) => {
  return (
    <section className="w-full pt-6 pb-28">
      <div className="max-w-[1700px] mx-auto px-5 lg:px-7 flex flex-col items-center">
        {hasMore && (
          <button
            onClick={onLoadMore}
            disabled={loading}
            className="
              w-full
              max-w-[320px]
              h-[58px]
              border
              border-[#3A3A3A]
              uppercase
              tracking-[0.35em]
              text-[11px]
              text-[#F5F5F5]
              transition-all
              duration-300
              hover:border-white
              hover:bg-white
              hover:text-black
              disabled:opacity-50
              disabled:cursor-not-allowed
            "
          >
            {loading ? "Loading..." : "Load More Archives"}
          </button>
        )}

        <p className="mt-8 text-[12px] tracking-[0.2em] text-zinc-500">
          Showing <span className="text-zinc-300">{shown}</span> of{" "}
          <span className="text-zinc-300">{total}</span> items
        </p>
      </div>
    </section>
  );
};

export default LoadMore;
