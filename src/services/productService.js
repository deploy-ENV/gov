import api from "./api";
import Cookies from 'js-cookie';

export const addProduct = async (supplierId, productData) => {
  try {
    console.log("productData", productData);

    const response = await api.post(
      `/auth/${supplierId}/products`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`
        }
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    throw error.response?.data || error.message;
  }
};