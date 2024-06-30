const domain =
  process.env.NODE_ENV === "production"
    ? "https://www.easyopen1573.com"
    : "http://localhost:5000";

export const base_url = `${domain}/api/form`;

export const sendOtp = "/send-otp";
export const verifyOtp = "/verify-otp";
