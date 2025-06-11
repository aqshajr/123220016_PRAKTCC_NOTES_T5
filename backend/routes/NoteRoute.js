//file ini berfungsi utk menghandle semua routing

import express from "express"; //karena pake express router
import { verifyToken } from "../middleware/VerifyToken.js"; //import middleware verifyToken

import {getNotes,
        getNoteById,
        createNote,
        updateNote,
        deleteNote
} from "../controllers/NoteController.js"; //panggil method

const router = express.Router();


router.get('/notes', verifyToken, getNotes);
router.get('/notes/:id', verifyToken, getNoteById);
router.post('/notes', createNote); 
router.patch('/notes/:id', verifyToken, updateNote);
router.delete('/notes/:id', deleteNote);

export default router;