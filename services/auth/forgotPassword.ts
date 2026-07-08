import axiosInstance from "@/lib/AxiosInstance";


export const forgetPassword = async (email: string): Promise<any> => {
  try {
    const response = await axiosInstance.post("/api/Users/forget-password", null, {
      params: { email },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Failed to send recovery email");
  }
};

export const verifyOtp = async (email: string, code: string): Promise<any> => {
  try {
    const response = await axiosInstance.post("/api/Users/verify-otp", null, {
      params: { email, code },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Invalid OTP code");
  }
};


export const resetPassword = async (email: string, newPassword: string): Promise<any> => {
  try {
    const response = await axiosInstance.post("/api/Users/reset-password", null, {
      params: { email, newPassword },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Failed to reset password");
  }
};


export const resendOtp = async (email: string): Promise<any> => {
  try {
    const response = await axiosInstance.post("/api/Users/resend-otp", null, {
      params: { email },
    });
    return response.data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || error.message || "Failed to resend OTP");
  }
};
