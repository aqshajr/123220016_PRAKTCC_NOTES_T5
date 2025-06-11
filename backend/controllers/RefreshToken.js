import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
    try {
        console.log('=== REFRESH TOKEN REQUEST ===');
        const refreshToken = req.cookies.refreshToken;
        console.log('Refresh token from cookie:', refreshToken ? refreshToken.substring(0, 20) + '...' : 'NOT FOUND');
        
        if (!refreshToken) {
            console.log('No refresh token provided');
            return res.sendStatus(401);
        }
        
        const user = await User.findAll({
            where: {
                refresh_token: refreshToken
            }
        });
        
        console.log('User found with refresh token:', !!user[0]);
        
        if (!user[0]) {
            console.log('No user found with this refresh token');
            return res.sendStatus(403);
        }
        
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.log('Refresh token verification failed:', err.message);
                return res.sendStatus(403);
            }
            
            const userId = user[0].id;
            const name = user[0].name;
            const email = user[0].email;
            
            console.log('Generating new access token for user:', { userId, name, email });
            
            const accessToken = jwt.sign({ userId, name, email }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '15m'
            });
            
            console.log('New access token generated successfully');
            console.log('=== REFRESH TOKEN COMPLETE ===\n');
            
            res.json({ accessToken });
        });
        
    } catch (error) {
        console.error('Refresh token error:', error);
        res.sendStatus(500);
    }
} 