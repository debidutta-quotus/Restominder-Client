import axios from "axios";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/store/login`,
      { email, password },
      // {withCredentials: true}
    );

    const token = response.data.token;

    if (token) {
      localStorage.setItem("token", token);
    } else {
      console.log("Token not found.");
    }
    
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Server Error:", error.response.data.message || "Something went wrong");
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      console.error("Network Error: No response from server");
      throw new Error("Network error. Please try again later.");
    } else {
      console.error("Error:", error.message);
      throw new Error("An unexpected error occurred.");
    }
  }
};