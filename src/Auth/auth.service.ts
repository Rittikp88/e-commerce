import axios from "axios";

const API_URL = "http://localhost:8000/api/v1/user/";

interface IUser {
    name: string;
    email: string;
    password: string;
    confirmPassword: string
}


const register = async ({name, email, password, confirmPassword} : IUser) => {
    try{
        const response = await axios.post('http://localhost:8000/api/v1/users/signup', {
            name,
            email,
            password,
            confirmPassword
        });
        console.log(response);
       return response.data;
    }catch(error){
        console.error("Axios error:", error);
        throw error;
    }

};


 const login = async ({ email, password }: Omit<IUser, 'name' | 'confirmPassword'>) => {
    try {
        const response = await axios.post('http://localhost:8000/api/v1/users/login', {
            email,
            password
        });
    
        if (response.data.token) {
            localStorage.setItem("user", JSON.stringify(response.data));
        }
    
        console.log(response);
    
        return response.data;
    } catch (error) {
        console.error("Axios error:", error);
        throw error;
    }
};

const loadUser = async() => {
    try {
        const response = await axio
    }
}
const logout = () => {
    localStorage.removeItem("user");
  };

  const authService = {
    register,
    login,
    logout,
  };

  export default authService;