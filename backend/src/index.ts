import express from 'express';
import router from './routes/index.js';
import { PORT, MONGO_URI } from './config/index.js';
import { connectToDatabase } from './db/index.js';
const app = express();

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connectToDatabase(MONGO_URI as string)
})
