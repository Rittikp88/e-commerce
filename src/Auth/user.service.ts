import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

interface IProduct {
  name: string;
  price: number;
  category: string;
  stock: string;
}

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getAllProducts = async () => {
  try {
    const response = await axios.get(
      "http://localhost:8000/api/v1/users/products"
    );
    console.log(response);

    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

const createProduct = async ({ name, price, category, stock }: IProduct) => {
  try {
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;

    const response = await axios.post(
      "http://localhost:8000/api/v1/users/admin/products/new",
      { name, price, category, stock },
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

const getAdminProducts = async () => {
  try {
    // Retrieve the user data from localStorage
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const response = await axios.get(
      "http://localhost:8000/api/v1/users/admin/products",
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.products);

    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

const deleteProduct = async (id : any) => {
  try{

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    console.log("dubara dedo",id)
    const {data} = await axios.delete(`http://localhost:8000/api/v1/users/product/${id}`,{
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch(error) {
    throw error;
  }
  
};

const updateProduct = async (id : any) => {
  try{

    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    console.log("dubara dedo",id)
    const {data} = await axios.put(`http://localhost:8000/api/v1/users/product/${id}`,{
      headers: {
        Authorization: `Bearer ${user?.token}`,
        "Content-Type": "application/json",
      },
    });
    return data;
  } catch(error) {
    throw error;
  }
  
};


const getProductDetails = async (id :any) => {
  try {
    // Retrieve the user data from localStorage
    const userString = localStorage.getItem("user");
    const user = userString ? JSON.parse(userString) : null;
    const response = await axios.get(
      `http://localhost:8000/api/v1/users/product/${id}`,
      {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(response.data.products);

    return response.data;
  } catch (error) {
    console.error("Axios error:", error);
    throw error;
  }
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getSuperAdminBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getSellerBoard = () => {
  return axios.get(API_URL + "seller", { headers: authHeader() });
};

const userService = {
  getPublicContent,
  getAllProducts,
  getAdminProducts,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductDetails,
  getUserBoard,
  getSuperAdminBoard,
  getAdminBoard,
  getSellerBoard,
};

export default userService;
