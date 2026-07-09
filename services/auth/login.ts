import axiosInstance from "@/lib/AxiosInstance";
import Cookies from "js-cookie";
import { AuthType } from "@/types/auth";

type LoginCredentials = {
    usernameOrEmail: string;
    password: string;
};

export const loginWithCredentials = async (credentials: LoginCredentials): Promise<AuthType> => {
    try {
        const response = await axiosInstance.post("/api/Users/login", credentials);

        if (response.status === 200) {
         const { role, token, id } = response.data;        
          
            Cookies.set("userRole", role, { path: "/", secure: true, sameSite: "Strict" });
            Cookies.set("authToken", token, { path: "/", secure: true, sameSite: "Strict" });
            Cookies.set("userId", id, { path: "/", secure: true, sameSite: "Strict" });

            return response.data;
        } else {
            throw new Error("Login failed");
        }
    } catch (error: any) {
        throw new Error(error.response?.data?.message || error.message);
    }
};