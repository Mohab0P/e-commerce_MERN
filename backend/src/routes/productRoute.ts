import express from 'express';
import { getProducts } from '../services/productService';


export const productRoute = express.Router();

productRoute.get(`/`,async(req,res)=>{
    try{
        const products = await getProducts();
        res.status(200).send(products);

    }catch(error){
        console.error("Error getting products:",error);
        res.status(500).send("Internal Server Error");
    }

})