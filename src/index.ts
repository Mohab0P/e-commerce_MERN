import express from 'express';
import mongoose from 'mongoose';
import {router} from './routes/userRoute';


const app = express();
const port = 3001;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ecommerce').then(()=>{console.log('Connected to database')}).catch((err)=>{console.log(err)});
app.use(`/user`,router);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})