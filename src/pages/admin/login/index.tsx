import { useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head"; // Import Head for adding title

import styles from "./login.module.css";
import { useAuth } from "@/contexts/AdminAuthContext";
import { useToast } from "@/contexts/ToastContext";
import axios from "axios";
import { admin_login_url } from "@/Utils/endpoints";

const Login = () => {
  const { setIsAuthenticated, adminToken, setAdminToken }: any = useAuth();
  const { showToast } = useToast();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username || !password) {
      showToast({ message: "Please fill in all fields", color: "#FF3333" });
      return;
    }

    try {
      const response = await axios.post(admin_login_url, {
        username,
        password,
      });

      if (response.data.success) {
        setIsAuthenticated(true);
        showToast({ message: "Login successful!", color: "#275338" });
        // setAdminToken(response.data.token)
        localStorage.setItem("adminTz", response.data.token);
        router.push("/admin");
      } else {
        showToast({ message: "Invalid credentials", color: "#FF3333" });
      }
    } catch (error) {
      console.error("Error logging in:", error);
      showToast({ message: "Error logging in", color: "#FF3333" });
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login - Modal University College</title>
      </Head>
      <div className={styles.loginContainer}>
        <form className={styles.loginForm} onSubmit={handleLogin}>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="username">
              Username:
            </label>
            <input
              className={styles.inputField}
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.inputLabel} htmlFor="password">
              Password:
            </label>
            <input
              className={styles.inputField}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className={styles.submitButton} type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
