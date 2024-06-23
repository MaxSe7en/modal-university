// services/authService.js
import axios from "axios";

export const sendOtp = async (phone: any) => {
  try {
    const response = await axios.post(
      `https://api-otp.hubtel.com/otp/send`,
      {
        senderId: 'MySenderId',
        phoneNumber: `${phone}`,
        countryCode: 'GH'
      }
    );
    console.log(response);
    return response.data; // Assuming the response contains the status or other useful data
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error; // You might want to handle this more gracefully in a real app
  }
};
