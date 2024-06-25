// pages/login.tsx
import { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './login.module.css';
import { useAuth } from '@/contexts/AdminAuthContext';

const Login = () => {
    const { setIsAuthenticated }: any = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Implement actual authentication logic here
        if (username === 'admin' && password === 'password') {
            setIsAuthenticated(true);
            router.push('/admin');
        } else {
            alert('Invalid credentials');
        }
    };
    console.log(username, password);
    return (
        <div className={styles.loginContainer}>
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel} htmlFor="username">Username:</label>
                    <input
                        className={styles.inputField}
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <label className={styles.inputLabel} htmlFor="password">Password:</label>
                    <input
                        className={styles.inputField}
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className={styles.submitButton} type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
