import React from "react";
import Navbar from "../components/Navbar";
import { useSelector } from "react-redux";
import { useProduct } from "../hooks/useProduct";
import { useEffect } from "react";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import ProductGrid from "../components/ProductGrid";
import LoadMore from "../components/LoadMore";
import Footer from "../components/Footer";

const Home = () => {
  const products = useSelector((state) => state.product.products);
  const { handleGetAllProducts } = useProduct();

  useEffect(() => {
    handleGetAllProducts();
  }, []);
  return (
    <div className="bg-[#111111] text-white min-h-screen">
      <Navbar />
      <Hero />
      {/* <ProductCard /> */}
      <ProductGrid />
      <LoadMore />
      <Footer />
    </div>
  );
};

export default Home;
