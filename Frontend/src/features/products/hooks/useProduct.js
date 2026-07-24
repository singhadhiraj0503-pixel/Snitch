import { useDispatch } from "react-redux";
import {
  createProduct,
  getAllProducts,
  getSellerProduct,
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

  return { handleCreateProduct, handleGetSellerProduct, handleGetAllProducts };
};
