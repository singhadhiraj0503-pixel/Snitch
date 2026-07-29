import { useDispatch } from "react-redux";
import {
  addProductVariant,
  createProduct,
  getAllProducts,
  getProductById,
  getSellerProduct,
  // updateProduct,
} from "../services/product.api";
import { setProducts, setSellerProducts } from "../state/product.slice";

export const useProduct = () => {
  const dispatch = useDispatch();

  const handleCreateProduct = async (formData) => {
    const data = await createProduct(formData);
    return data.product;
  };

  const handleGetSellerProduct = async () => {
    const data = await getSellerProduct();
    dispatch(setSellerProducts(data.products));
    return data.product;
  };

  const handleGetAllProducts = async () => {
    const data = await getAllProducts();
    dispatch(setProducts(data.products));
  };

  const handleGetProductById = async (productId) => {
    const data = await getProductById(productId);
    return data.product;
  };

  const handleAddProductVariant = async (productId, variants) => {
    const data = await addProductVariant(productId, variants);
    return data;
  };

  // const handleUpdateProduct = async (product, productId) => {
  //   const data = await updateProduct(product, productId);
  //   dispatch(setProducts(data.product));
  //   return data.product;
  // };

  return {
    handleCreateProduct,
    handleGetSellerProduct,
    handleGetAllProducts,
    handleGetProductById,
    handleAddProductVariant,
    // handleUpdateProduct,
  };
};
