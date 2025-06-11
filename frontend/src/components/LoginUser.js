import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../utils';

const LoginUser = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        try {
            const response = await axios.post(API_ENDPOINTS.LOGIN, {
                email,
                password
            });

            // Simpan access token ke localStorage
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('userEmail', email);
            
            setMessage('Login berhasil! Redirecting...');
            
            // Redirect ke halaman utama setelah 1 detik
            setTimeout(() => {
                navigate('/');
            }, 1000);

        } catch (error) {
            console.error('Login error:', error);
            setMessage(error.response?.data?.msg || 'Login gagal. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.loginBox}>
                <h2 style={styles.title}>Login to My Notebook</h2>
                
                <form onSubmit={handleLogin} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            style={styles.input}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={styles.loginButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                </form>

                {message && (
                    <div style={{
                        ...styles.message,
                        color: message.includes('berhasil') ? '#4CAF50' : '#f44336'
                    }}>
                        {message}
                    </div>
                )}

                <div style={styles.signupLink}>
                    <p>Don't have an account? 
                        <Link to="/signup" style={styles.link}> Sign up here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f7f7f7',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: '"Arial", sans-serif',
        backgroundImage: `linear-gradient(to bottom, transparent 95%, #e0e0e0 95%)`,
        backgroundSize: '100% 30px',
    },
    loginBox: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        width: '400px',
        textAlign: 'center',
    },
    title: {
        fontSize: '28px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '30px',
        fontFamily: '"Patrick Hand", cursive',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    inputGroup: {
        textAlign: 'left',
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontWeight: 'bold',
        color: '#555',
    },
    input: {
        width: '100%',
        padding: '12px',
        border: '2px solid #ddd',
        borderRadius: '8px',
        fontSize: '16px',
        transition: 'border-color 0.3s',
        boxSizing: 'border-box',
    },
    loginButton: {
        backgroundColor: '#FF9AA2',
        color: 'white',
        padding: '15px',
        border: 'none',
        borderRadius: '8px',
        fontSize: '18px',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        marginTop: '10px',
    },
    message: {
        marginTop: '20px',
        padding: '10px',
        borderRadius: '5px',
        fontWeight: 'bold',
    },
    signupLink: {
        marginTop: '20px',
        color: '#666',
    },
    link: {
        color: '#FF9AA2',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default LoginUser; 