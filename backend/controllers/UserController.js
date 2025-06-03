import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['id', 'name', 'email']
        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const getUserById = async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: ['id', 'name', 'email'],
            where: {
                id: req.params.id
            }
        });
        res.json(user);
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password tidak cocok" });
    
    const encryptPassword = await bcrypt.hash(password, 5);
    
    try {
        await User.create({
            name: name,
            email: email,
            password: encryptPassword
        });
        res.json({ msg: "Register Berhasil" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const updateUser = async (req, res) => {
    const { name, email, password, confPassword } = req.body;
    
    let updateData = { name, email };
    
    if (password) {
        if (password !== confPassword) return res.status(400).json({ msg: "Password and Confirm Password tidak cocok" });
        const encryptPassword = await bcrypt.hash(password, 5);
        updateData.password = encryptPassword;
    }
    
    try {
        await User.update(updateData, {
            where: {
                id: req.params.id
            }
        });
        res.json({ msg: "User Updated" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const deleteUser = async (req, res) => {
    try {
        await User.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({ msg: "User Deleted" });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
}

export const loginHandler = async (req, res) => {
    try {
        const user = await User.findAll({
            where: {
                email: req.body.email
            }
        });
        
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if (!match) return res.status(400).json({ msg: "Wrong Password" });
        
        const userId = user[0].id;
        const name = user[0].name;
        const email = user[0].email;
        
        const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15s'
        });
        
        const refreshToken = jwt.sign({ userId, name, email }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });
        
        await User.update({ refresh_token: refreshToken }, {
            where: {
                id: userId
            }
        });
        
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });
        
        res.json({ accessToken });
        
    } catch (error) {
        res.status(404).json({ msg: "Email tidak ditemukan" });
    }
}

export const logout = async (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(204);
    
    const user = await User.findAll({
        where: {
            refresh_token: refreshToken
        }
    });
    
    if (!user[0]) return res.sendStatus(204);
    
    const userId = user[0].id;
    
    await User.update({ refresh_token: null }, {
        where: {
            id: userId
        }
    });
    
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
} 