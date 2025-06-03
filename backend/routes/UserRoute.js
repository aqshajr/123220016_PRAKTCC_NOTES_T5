import express from "express";
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    loginHandler,
    logout
} from "../controllers/UserController.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { verifyToken } from "../middleware/VerifyToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.get('/users/:id', verifyToken, getUserById);
router.post('/users', createUser);
router.patch('/users/:id', verifyToken, updateUser);
router.delete('/users/:id', deleteUser);
router.post('/login', loginHandler);
router.delete('/logout', logout);
router.get('/token', refreshToken);

export default router; 