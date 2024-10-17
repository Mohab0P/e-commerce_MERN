import {productModel}  from "../models/productModels";

export const getProducts = async () => {
    return await productModel.find();
}


export const seedInitialProducts = async () => {
    const products=[
        {
            name: "Airpods Wireless Bluetooth Headphones",
            image: "/images/airpods.jpg",
            price: 89.99,
            countInStock: 10
        },
        {
            name: "iPhone 11 Pro 256GB Memory",
            image: "/images/phone.jpg",
            price: 599.99,
            countInStock: 7
        },
        {
            name: "Cannon EOS 80D DSLR Camera",
            image: "/images/camera.jpg",
            price: 929.99,
            countInStock: 5
        },
        {
            name: "Sony Playstation 4 Pro White Version",
            image: "/images/playstation.jpg",
            price: 399.99,
            countInStock: 11
        },
        {
            name: "Logitech G-Series Gaming Mouse",
            image: "/images/mouse.jpg",
            price: 49.99,
            countInStock: 7
        },
        {
            name: "Amazon Echo Dot 3rd Generation",
            image: "/images/alexa.jpg",
            price: 29.99,
            countInStock: 0
        },
    ];
    const existingProducts = await getProducts();
    if (existingProducts.length === 0) {
        await productModel.insertMany(products);
    }
}