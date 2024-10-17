import express from 'express';
import { getProducts } from '../services/productService';


export const productRoute = express.Router();

productRoute.get(`/`,async(req,res)=>{
    const products = await getProducts();
    res.status(200).send(products);

})