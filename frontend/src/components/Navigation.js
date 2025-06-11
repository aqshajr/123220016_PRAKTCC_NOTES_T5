import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../utils';

const Navigation = () => {
    const navigate = useNavigate();
    const isLoggedIn = localStorage.getItem('accessToken');
    const userEmail = localStorage.getItem('userEmail');

    const handleLogout = async () => {
        try {
            await axios.delete(API_ENDPOINTS.LOGOUT, {
                withCredentials: true
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage regardless of API call result
            localStorage.removeItem('accessToken');
            localStorage.removeItem('userEmail');
            navigate('/login');
        }
    };

    return (
        <nav style={styles.nav}>
            <div style={styles.navContainer}>
                <Link to="/" style={styles.logo}>
                    📓 My Notebook
                </Link>
                
                <div style={styles.navLinks}>
                    {isLoggedIn ? (
                        <>
                            <span style={styles.userInfo}>
                                Welcome, {userEmail}
                            </span>
                            <button 
                                onClick={handleLogout}
                                style={styles.logoutButton}
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={styles.link}>
                                Login
                            </Link>
                            <Link to="/signup" style={styles.link}>
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        backgroundColor: '#fff',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        padding: '0 20px',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    navContainer: {
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '60px',
    },
    logo: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#333',
        textDecoration: 'none',
        fontFamily: '"Patrick Hand", cursive',
    },
    navLinks: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    link: {
        color: '#666',
        textDecoration: 'none',
        fontWeight: '500',
        transition: 'color 0.3s',
    },
    userInfo: {
        color: '#666',
        fontSize: '14px',
    },
    logoutButton: {
        backgroundColor: '#FF9AA2',
        color: 'white',
        border: 'none',
        padding: '8px 16px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: '500',
        transition: 'background-color 0.3s',
    },
};

export default Navigation; 