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
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(NoteRoute);
app.use(UserRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> console.log(`Server running on port ${PORT}...`))