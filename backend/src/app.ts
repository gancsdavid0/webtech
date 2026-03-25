import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true                
}));

app.use(express.json());

app.use('/api', routes);

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the parking API',
        endpoints: {
            reservation: '/api/reservation',
            user: '/api/user',
            auth: '/api/auth',
            parkingZone: '/api/parking-zone',
            parkingSpot: '/api/parking-spot',
        }
    });
});


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));