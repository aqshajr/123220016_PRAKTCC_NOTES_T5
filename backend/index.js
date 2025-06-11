import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import NoteRoute from "./routes/NoteRoute.js";
import UserRoute from "./routes/UserRoute.js";

const app = express();

// Configure CORS with enhanced debugging
const corsOptions = {
    origin: function (origin, callback) {
        console.log('CORS Origin Check:', origin);
        
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) {
            console.log('No origin, allowing request');
            return callback(null, true);
        }
        
        const allowedOrigins = [
            'http://localhost:3000', // for development
            'https://g-04-450802.uc.r.appspot.com', // production frontend URL
            'http://localhost:5000', // local backend testing
            'https://g-04-450802.uc.r.appspot.com' // Double entry for extra safety
        ];
        
        console.log('Allowed origins:', allowedOrigins);
        
        if (allowedOrigins.includes(origin)) {
            console.log('Origin allowed:', origin);
            callback(null, true);
        } else {
            console.log('CORS blocked origin:', origin);
            console.log('Available origins:', allowedOrigins);
            // Allow the request anyway for debugging
            callback(null, true);
        }
    },
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'X-Requested-With',
        'Accept',
        'Origin'
    ],
    exposedHeaders: ['Set-Cookie'],
    optionsSuccessStatus: 200 // for legacy browser support
};

app.use(cors(corsOptions));

// Handle preflight requests explicitly for ALL routes
app.options('*', (req, res) => {
    console.log('OPTIONS request received for:', req.path);
    console.log('Origin:', req.headers.origin);
    
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With, Accept, Origin');
    res.header('Access-Control-Allow-Credentials', true);
    
    res.sendStatus(200);
});

app.use(cookieParser());
app.use(express.json());

// Add logging middleware for debugging
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
    console.log('Origin:', req.headers.origin);
    console.log('User-Agent:', req.headers['user-agent']);
    
    // Add CORS headers manually as backup
    res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.header('Access-Control-Allow-Credentials', true);
    
    next();
});

// Add ping endpoint BEFORE other routes
app.get('/ping', (req, res) => {
    console.log('Ping endpoint hit');
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'Backend is running',
        origin: req.headers.origin
    });
});

app.use(NoteRoute);
app.use(UserRoute);

// Add basic health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}...`))