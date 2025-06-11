import Note from "../models/NoteModel.js";

export const getNotes = async(req, res) => {
    try {
        const response = await Note.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//untuk mengambil single data
export const getNoteById = async(req, res) => {
    try {
        const response = await Note.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

//CREATE
export const createNote = async(req, res) => {
    try {
        await Note.create(req.body);
        res.status(201).json({msg: "Note Created"});
    } catch (error) {
        console.log(error.message);
    }
}

//UPDATE
export const updateNote = async(req, res) => {
    try {
        await Note.update(req.body,{
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Note Updated"});
    } catch (error) {
        console.log(error.message);
    }
}

//UPDATE
export const deleteNote = async(req, res) => {
    try {
        await Note.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json({msg: "Note Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}
