import Note from "../models/NoteModel.js";
import User from "../models/UserModel.js";

export const getNotes = async(req, res) => {
    try {
        // Get notes only for the authenticated user
        const response = await Note.findAll({
            where: {
                userId: req.userId // userId akan di-set oleh verifyToken middleware
            },
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: error.message});
    }
}

//untuk mengambil single data
export const getNoteById = async(req, res) => {
    try {
        const response = await Note.findOne({
            where:{
                id: req.params.id,
                userId: req.userId // Pastikan note milik user yang authenticated
            },
            include: [{
                model: User,
                attributes: ['name', 'email']
            }]
        });
        
        if (!response) {
            return res.status(404).json({msg: "Note not found or not accessible"});
        }
        
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: error.message});
    }
}

//CREATE
export const createNote = async(req, res) => {
    try {
        const { title, description, category } = req.body;
        
        await Note.create({
            title,
            description,
            category,
            userId: req.userId // Tambahkan userId dari token
        });
        
        res.status(201).json({msg: "Note Created"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: error.message});
    }
}

//UPDATE
export const updateNote = async(req, res) => {
    try {
        const { title, description, category } = req.body;
        
        const [updated] = await Note.update({
            title,
            description,
            category
        }, {
            where:{
                id: req.params.id,
                userId: req.userId // Pastikan hanya update note milik user
            }
        });
        
        if (updated === 0) {
            return res.status(404).json({msg: "Note not found or not accessible"});
        }
        
        res.status(200).json({msg: "Note Updated"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: error.message});
    }
}

//DELETE
export const deleteNote = async(req, res) => {
    try {
        const deleted = await Note.destroy({
            where:{
                id: req.params.id,
                userId: req.userId // Pastikan hanya delete note milik user
            }
        });
        
        if (deleted === 0) {
            return res.status(404).json({msg: "Note not found or not accessible"});
        }
        
        res.status(200).json({msg: "Note Deleted"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({msg: error.message});
    }
}
