const domain = "https://apply.modalcollege.com/"
  // process.env.NODE_ENV === "production"
  //   ? "https://apply.modalcollege.com/"
  //   : "http://localhost:5000";

export const base_url = `${domain}/api/form`;

export const sendOtpUrl = `${base_url}/send-otp`;
export const verifyOtpUrl = `${base_url}/verify-otp`;
export const user_url = `${base_url}/users`;
