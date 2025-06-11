import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { API_ENDPOINTS } from '../utils';

const SignupUser = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confPassword: ''
    });
    const [message, setMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setMessage('');

        if (formData.password !== formData.confPassword) {
            setMessage('Password and Confirm Password tidak cocok');
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post(API_ENDPOINTS.USERS, {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confPassword: formData.confPassword
            });

            setMessage('Registrasi berhasil! Redirecting to login...');
            
            setFormData({
                name: '',
                email: '',
                password: '',
                confPassword: ''
            });

            setTimeout(() => {
                navigate('/login');
            }, 2000);

        } catch (error) {
            console.error('Signup error:', error);
            setMessage(error.response?.data?.msg || 'Registrasi gagal. Silakan coba lagi.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.signupBox}>
                <h2 style={styles.title}>Join My Notebook</h2>
                
                <form onSubmit={handleSignup} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            style={styles.input}
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            style={styles.input}
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            style={styles.input}
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Confirm Password</label>
                        <input
                            type="password"
                            name="confPassword"
                            value={formData.confPassword}
                            onChange={handleInputChange}
                            style={styles.input}
                            placeholder="Confirm your password"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        style={styles.signupButton}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Creating Account...' : 'Sign Up'}
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

                <div style={styles.loginLink}>
                    <p>Already have an account? 
                        <Link to="/login" style={styles.link}> Login here</Link>
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
    signupBox: {
        backgroundColor: '#fff',
        padding: '40px',
        borderRadius: '15px',
        boxShadow: '0 8px 20px rgba(0, 0, 0, 0.1)',
        width: '450px',
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
    signupButton: {
        backgroundColor: '#B5EAD7',
        color: '#333',
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
    loginLink: {
        marginTop: '20px',
        color: '#666',
    },
    link: {
        color: '#B5EAD7',
        textDecoration: 'none',
        fontWeight: 'bold',
    },
};

export default SignupUser; 