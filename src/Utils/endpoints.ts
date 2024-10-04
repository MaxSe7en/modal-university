const domain = //"https://modalcollege.com:5000"
  process.env.NODE_ENV === "production"
    ? "https://modalcollege.com:5000"
    : "http://localhost:5000";

export const base_url = `${domain}/api/form`;
export const admin_base_url = `${domain}/api/admin`;

export const sendOtpUrl = `${base_url}/send-otp`;
export const verifyOtpUrl = `${base_url}/verify-otp`;
export const active_academic_year_url = `${base_url}/academic-years/active`;
export const user_url = `${admin_base_url}/users`;
export const admission_status_url = `${admin_base_url}/academic-information`;
export const academic_year_admin_url = `${admin_base_url}/academic-years`;
export const admin_login_url =  `${admin_base_url}/login`
export const submit_url = `${base_url}/submit`;// /admin/academic-years
export const programmes_url = `${base_url}/programmes/active`;// /admin/academic-years
