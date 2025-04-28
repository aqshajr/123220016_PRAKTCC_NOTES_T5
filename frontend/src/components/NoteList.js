import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const NoteList = () => {
    const [notes, setNotes] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('Work');
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        const response = await axios.get('https://tugas6-backend-749281711221.us-central1.run.app/notes');
        setNotes(response.data);
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`https://tugas6-backend-749281711221.us-central1.run.app/notes/${id}`);
            getNotes();
        } catch (error) {
            console.log(error);
        }
    };

    const filteredNotes = notes.filter((note) => note.category === currentCategory);

    const notesPerPage = 4;
    const totalPages = Math.ceil(filteredNotes.length / notesPerPage);
    const startIndex = currentPage * notesPerPage;
    const currentNotes = filteredNotes.slice(startIndex, startIndex + notesPerPage);

    const truncateText = (text, maxLength) => {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    };

    const getUniquePastelColors = (count) => {
        const pastelColors = [
            '#FFD1DC', 
            '#B5EAD7',
            '#C7CEEA',
            '#FF9AA2',
            '#FFB7B2', 
            '#E2F0CB', 
            '#D4A5A5', 
            '#FFDAC1', 
            '#FBE4FF', 
        ];
        const shuffledColors = pastelColors.sort(() => Math.random() - 0.5);
        return shuffledColors.slice(0, count);
    };

    const uniqueColors = getUniquePastelColors(currentNotes.length);

    return (
        <div style={styles.container}>
            <h1 style={styles.notebookTitle}>My Notebook</h1>

            <div style={styles.notebook}>
                <div style={styles.notesSection}>
                    <div style={styles.notesGrid}>
                        {currentNotes.map((note, index) => (
                            <div key={note.id} style={{ ...styles.noteCard, backgroundColor: uniqueColors[index] }}>
                                <div style={styles.noteContent}>
                                    <h3 style={styles.noteTitle}>{note.title}</h3>
                                    <p style={styles.noteDescription}>
                                        {truncateText(note.description, 100)}
                                    </p>
                                </div>
                                <div style={styles.noteActions}>
                                    <Link to={`edit/${note.id}`} style={styles.editButton}>
                                        ✏️ Edit
                                    </Link>
                                    <button onClick={() => deleteNote(note.id)} style={styles.deleteButton}>
                                        🗑️ Delete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div style={styles.pagination}>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                            disabled={currentPage === 0}
                            style={styles.arrowButton}
                        >
                            ◀️
                        </button>
                        <span style={styles.pageInfo}>
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                            disabled={currentPage === totalPages - 1}
                            style={styles.arrowButton}
                        >
                            ▶️
                        </button>
                    </div>
                </div>

                <div style={styles.categorySection}>
                    <h3 style={styles.categoryTitle}>Categories</h3>
                    {['Work', 'Personal', 'Ideas', 'Study', 'To-Do'].map((category) => (
                        <div
                            key={category}
                            style={{
                                ...styles.categoryTab,
                                backgroundColor: currentCategory === category ? '#FF9AA2' : '#f7f7f7',
                                color: currentCategory === category ? '#fff' : '#333',
                            }}
                            onClick={() => {
                                setCurrentCategory(category);
                                setCurrentPage(0); 
                            }}
                        >
                            {category}
                        </div>
                    ))}
                </div>
            </div>

            <Link to={`add`} style={styles.addButton}>
                + Add New Note
            </Link>
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
    notesGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '20px',
        width: '100%',
    },
    noteCard: {
        padding: '15px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '200px',
    },
    noteContent: {
        flex: 1,
    },
    noteTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        marginBottom: '10px',
        color: '#333',
    },
    noteDescription: {
        fontSize: '16px',
        color: '#555',
    },
    noteActions: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '10px',
    },
    editButton: {
        padding: '5px 10px',
        backgroundColor: '#ffaa80',
        color: '#ffffff',
        borderRadius: '5px',
        textDecoration: 'none',
        fontSize: '14px',
        textAlign: 'center',
    },
    deleteButton: {
        padding: '5px 10px',
        backgroundColor: '#ff6f61', 
        color: '#ffffff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '14px',
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
    pagination: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '20px',
    },
    arrowButton: {
        padding: '5px 10px',
        backgroundColor: '#FF9AA2', 
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px',
        margin: '0 10px',
    },
    pageInfo: {
        fontSize: '16px',
        color: '#333',
    },
    addButton: {
        display: 'block',
        width: '200px',
        margin: '20px auto',
        padding: '10px 20px',
        backgroundColor: '#FF9AA2', 
        color: '#ffffff',
        borderRadius: '10px',
        textDecoration: 'none',
        fontSize: '18px',
        textAlign: 'center',
        fontWeight: 'bold',
    },
};

export default NoteList;
