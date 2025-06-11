import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    console.log('=== TOKEN VERIFICATION ===');
    console.log('Auth header:', authHeader);
    console.log('Token:', token ? 'EXISTS' : 'MISSING');
    console.log('ACCESS_TOKEN_SECRET exists:', !!process.env.ACCESS_TOKEN_SECRET);
    
    if (token == null) {
        console.log('Token is null, returning 401');
        return res.sendStatus(401);
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.log('JWT verification error:', err.message);
            return res.sendStatus(403);
        }
        console.log('Token verified successfully for user:', decoded.email);
        req.email = decoded.email;
        req.userId = decoded.userId;
        next();
    });
} 