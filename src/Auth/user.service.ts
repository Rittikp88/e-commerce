import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";

const getPublicContent = () => {
    return axios.get(API_URL + "all");
  };

  const getAllProducts = async () => {

    try {
      const response = await axios.get('http://localhost:8000/api/v1/users/products');
      console.log(response);
      
    return response.data;
    }catch (error) {
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
    getUserBoard,
    getSuperAdminBoard,
    getAdminBoard,
    getSellerBoard
  };
  
  export default userService