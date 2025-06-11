import express from "express";
import cors from "cors";

const app = express();

// Simple CORS setup for testing
app.use(cors({
    origin: ['https://g-04-450802.uc.r.appspot.com', 'http://localhost:3000'],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept']
}));

app.use(express.json());

// Explicit OPTIONS handler
app.options('*', (req, res) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || 'https://g-04-450802.uc.r.appspot.com');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept');
    res.header('Access-Control-Allow-Credentials', true);
    res.sendStatus(200);
});

// Add CORS headers to all responses
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin || 'https://g-04-450802.uc.r.appspot.com');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

// Basic endpoints
app.get('/ping', (req, res) => {
    console.log('Ping endpoint hit from:', req.headers.origin);
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'Minimal backend is running',
        origin: req.headers.origin
    });
});

app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        message: 'Health check passed'
    });
});

// Mock login endpoint
app.post('/login', (req, res) => {
    console.log('Login attempt from:', req.headers.origin);
    console.log('Request body:', req.body);
    
    // Simple mock response
    if (req.body.email && req.body.password) {
        res.json({
            success: true,
            message: 'Mock login successful',
            user: { id: 1, email: req.body.email, name: 'Test User' },
            token: 'mock-jwt-token'
        });
    } else {
        res.status(400).json({
            success: false,
            message: 'Email and password required'
        });
    }
});

// Catch all other routes
app.get('*', (req, res) => {
    res.json({ 
        message: 'Minimal backend is running',
        path: req.path,
        method: req.method,
        timestamp: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Minimal backend running on port ${PORT}`);
    console.log(`✅ No database dependency`);
    console.log(`🌐 CORS enabled for: https://g-04-450802.uc.r.appspot.com`);
}); 