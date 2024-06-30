// services/authService.js
import axios from "axios";

export const sendOtp = async (phone: any) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/form/send-otp`,
      {
        phoneNumber: `${phone}`,
        countryCode: 'GH'
      }
    );
    // const response = await axios.post(
    //   `https://api-otp.hubtel.com/otp/send`,
    //   {
    //     senderId: 'MySenderId',
    //     phoneNumber: `${phone}`,
    //     countryCode: 'GH'
    //   }
    // );
    const {data, status} = response;

    console.log(response);
    return {status: status, data: data}; // Assuming the response contains the status or other useful data
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error; // You might want to handle this more gracefully in a real app
  }
};

export const verifyOtp = async (phone: any, otpCode:any) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/form/verify-otp`,
      {
        phoneNumber: `${phone}`,
        otp: `${otpCode}`,
        countryCode: 'GH'
      }
    );
    // const response = await axios.post(
    //   `https://api-otp.hubtel.com/otp/send`,
    //   {
    //     senderId: 'MySenderId',
    //     phoneNumber: `${phone}`,
    //     countryCode: 'GH'
    //   }
    // );
    const {data, status} = response;
    console.log(response);
    return {status: status, data: data};; // Assuming the response contains the status or other useful data
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error; // You might want to handle this more gracefully in a real app
  }
};
