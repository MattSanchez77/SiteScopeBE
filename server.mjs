import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './db/conn.mjs';
import globalErr from './middleware/globalErr.mjs';
import morgan from 'morgan';
import siteRoute from './routes/siteRoute.mjs'


dotenv.config();
connectDB()
const app = express();
const PORT = process.env.PORT || 3001;



app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());


// Routes
app.use('/api/sites', siteRoute);

// err Middleware
app.use(globalErr)

// listener
app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`);
    
});
