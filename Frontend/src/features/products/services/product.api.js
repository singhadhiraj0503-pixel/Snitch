import axios from "axios";

const productApiInstance = axios.create({
  baseURL: "/api/products",
  withCredentials: true,
});

export const createProduct = async (formData) => {
  const response = await productApiInstance.post("/", formData);

  return response.data;
};

export const getSellerProduct = async () => {
  const response = await productApiInstance.get("/seller");

  return response.data;
};

export const getAllProducts = async () => {
  const response = await productApiInstance.get("/");
  return response.data;
};

export const getProductById = async (productId) => {
  const response = await productApiInstance.get(`/details/${productId}`);
  return response.data;
};

export const addProductVariant = async (productId, variant) => {
  const formData = new FormData();

  if (variant.images?.length) {
    variant.images.forEach((image) => {
      if (image.file) {
        formData.append("images", image.file);
      }
    });
  }

  formData.append("priceAmount", variant.price);

  formData.append("stock", variant.stock);

  formData.append(
    "attributes",
    JSON.stringify({
      size: variant.size,
      color: variant.color,
    }),
  );

  const response = await productApiInstance.post(
    `/${productId}/variants`,
    formData,
  );

  return response.data;
};

// export const updateProduct = async (product, productId) => {
//   const response = await productApiInstance.patch(`/update/${productId}`);
//   return response.data;
// };
