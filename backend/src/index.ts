import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import {router} from './routes/userRoute';
import { seedInitialProducts } from './services/productService';
import { productRoute } from './routes/productRoute';
import { cartRouter } from './routes/cartRoute';
dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());

mongoose.connect(process.env.DATABASE_URL ||"").then(()=>{console.log('Connected to database')}).catch((err)=>{console.log(err)});


//seed the products
 seedInitialProducts();

app.use(`/user`,router);
app.use(`/product`,productRoute);  
app.use('/cart',cartRouter)



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})