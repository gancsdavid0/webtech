import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes.js';
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: [
        'http://localhost',
        'http://127.0.0.1',
        'http://localhost:5173',
        'http://localhost:80'
    ],
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