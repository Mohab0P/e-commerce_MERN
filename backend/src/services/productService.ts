import {productModel}  from "../models/productModels";

export const getProducts = async () => {
    return await productModel.find();
}


export const seedInitialProducts = async () => {
    try{

        const products=[
            {
                name: "Side Eye Cat Meme, AKA Mr. Fresh",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFGIguNpiZCyNoJ4g4-6b92e6ruvlYIjQCJQ&s",
                price: 8888889.99,
                countInStock: 10
            },
            {
                name: "Cute Cat",
                image: "https://ih1.redbubble.net/image.5498350372.7646/bg,f8f8f8-flat,750x,075,f-pad,750x1000,f8f8f8.u3.webp",
                price: 1,
                countInStock: 7
            },
            {
                name: "Crunchy Cat",
                image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS74mhtRRoMmOsR3ukeCf-1vJYM6nZnEdS1thn27QRemi74V94F0mPxyOFeFZRdGGAFMZc&usqp=CAU",
                price: 929.99,
                countInStock: 5
            },
            {
                name: "War Cat",
                image: "https://content.imageresizer.com/images/memes/War-Cat-meme-88f6yf.jpg",
                price: 399.99,
                countInStock: 11
            },
            {
                name: "Huh?",
                image: "https://i.makeagif.com/media/11-08-2023/Mq0hpC.gif",
                price: 49.99,
                countInStock: 7
            },
            {
                name: "White cat",
                image: "https://a.pinatafarm.com/940x529/254350840f/white-cat-da2c837628aa5a4d253f3956efa6244f-meme.jpeg",
                price: 29.99,
                countInStock: 0
            },
        ];
        const existingProducts = await getProducts();
        if (existingProducts.length === 0) {
            await productModel.insertMany(products);
        }
    }catch(error){
        console.error("Cannot seed products:", error);
    }
}