import express from 'express';
import mongoose from 'mongoose';
import {router} from './routes/userRoute';
import { seedInitialProducts } from './services/productService';
import { productRoute } from './routes/productRoute';
import { cartRouter } from './routes/cartRoute';

const app = express();
const port = 3001;

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ecommerce').then(()=>{console.log('Connected to database')}).catch((err)=>{console.log(err)});


//seed the products
 seedInitialProducts();

app.use(`/user`,router);
app.use(`/product`,productRoute);  
app.use('/cart',cartRouter)



app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})