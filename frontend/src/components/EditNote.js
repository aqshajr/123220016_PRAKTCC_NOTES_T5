import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const EditNote = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Work');
    const [backgroundColor, setBackgroundColor] = useState(''); 
    const navigate = useNavigate();
    const { id } = useParams();

    const getRandomPastelColor = () => {
        const pastelColors = [
            '#B5EAD7', 
            '#C7CEEA', 
            '#E2F0CB', 
            '#D4A5A5', 
            '#FBE4FF',
        ];
        return pastelColors[Math.floor(Math.random() * pastelColors.length)];
    };

    useEffect(() => {
        setBackgroundColor(getRandomPastelColor());
    }, [category]); 

    useEffect(() => {
        getNoteById();
    }, []);

    const updateNote = async (e) => {
        e.preventDefault();
        try {
            await axios.patch(`http://localhost:5000/notes/${id}`, {
                title,
                description,
                category,
            });
            navigate('/'); 
        } catch (error) {
            console.log(error);
        }
    };

    const getNoteById = async () => {
        const response = await axios.get(`http://localhost:5000/notes/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setCategory(response.data.category);
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.notebookTitle}>Edit Note</h1>
            <div style={styles.notebook}>
              
                <div style={styles.notesSection}>
                    <form onSubmit={updateNote} style={styles.form}>
                        <div style={styles.field}>
                            <label style={styles.label}>Title</label>
                            <input
                                type="text"
                                style={styles.input}
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Title"
                            />
                        </div>
                        <div style={styles.field}>
                            <label style={styles.label}>Description</label>
                            <textarea
                                style={{ ...styles.textarea, backgroundColor }}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Description"
                            />
                        </div>
                        <div style={styles.buttonContainer}>
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                style={styles.backButton}
                            >
                                Back
                            </button>
                            <button type="submit" style={styles.saveButton}>
                                Update
                            </button>
                        </div>
                    </form>
                </div>

                <div style={styles.categorySection}>
                    <h3 style={styles.categoryTitle}>Categories</h3>
                    {['Work', 'Personal', 'Ideas', 'Study', 'To-Do'].map((cat) => (
                        <div
                            key={cat}
                            style={{
                                ...styles.categoryTab,
                                backgroundColor: category === cat ? '#FF9AA2' : '#f7f7f7',
                                color: category === cat ? '#fff' : '#333',
                            }}
                            onClick={() => setCategory(cat)}
                        >
                            {cat}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: '20px',
        minHeight: '100vh',
        backgroundImage: `linear-gradient(to bottom, transparent 95%, #e0e0e0 95%)`, 
        backgroundSize: '100% 30px',
        backgroundColor: '#f7f7f7', 
        fontFamily: '"Patrick Hand", cursive', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    notebookTitle: {
        fontSize: '32px',
        fontWeight: 'bold',
        color: '#333',
        marginBottom: '20px',
        fontFamily: '"Patrick Hand", cursive', 
    },
    notebook: {
        width: '1000px', 
        height: '550px', 
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        display: 'flex',
    },
    notesSection: {
        flex: 3,
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    field: {
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
    },
    label: {
        fontSize: '18px',
        fontWeight: 'bold',
        color: '#333',
    },
    input: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        fontFamily: '"Patrick Hand", cursive',
        backgroundColor: '#fff',
        width: '100%',
    },
    textarea: {
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '16px',
        fontFamily: '"Patrick Hand", cursive', 
        resize: 'vertical', 
        height: '300px', 
        overflowY: 'auto', 
        width: '100%',
    },
    buttonContainer: {
        display: 'flex',
        gap: '10px', 
        width: '100%', 
    },
    backButton: {
        flex: 1, 
        padding: '10px 20px',
        backgroundColor: '#d6d4d4', 
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: '"Patrick Hand", cursive', 
        textAlign: 'center',
    },
    saveButton: {
        flex: 1,
        padding: '10px 20px',
        backgroundColor: '#FF9AA2', 
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        fontWeight: 'bold',
        fontFamily: '"Patrick Hand", cursive', 
        textAlign: 'center',
    },
    categorySection: {
        flex: 1,
        padding: '20px',
        backgroundColor: '#FFDAC1', 
    },
    categoryTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
        color: '#333',
    },
    categoryTab: {
        padding: '10px',
        marginBottom: '10px',
        borderRadius: '5px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'background-color 0.3s, color 0.3s',
    },
};

export default EditNote;