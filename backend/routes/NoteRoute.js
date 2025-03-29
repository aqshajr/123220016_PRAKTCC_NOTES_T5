//file ini berfungsi utk menghandle semua routing

import express from "express"; //karena pake express router

import {getNotes,
        getNoteById,
        createNote,
        updateNote,
        deleteNote
} from "../controllers/NoteController.js"; //panggil method

const router = express.Router();

//buat endpoint baru
router.get('/notes', getNotes);
router.get('/notes/:id', getNoteById);
router.post('/notes', createNote);
router.patch('/notes/:id', updateNote);
router.delete('/notes/:id', deleteNote);

export default router;