import { userModel } from "../models/userModels";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface RegisterParams {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

export const register= async({firstName,lastName,email,password}:RegisterParams)=>{
    const findUser=await userModel.findOne({email});

    if(findUser){
        return {data:"User already exists",statusCode:400};
}
const hashedPassword=await bcrypt.hash(password,10);

const newUser=new userModel({firstName,lastName,email,password:hashedPassword});
await newUser.save();

return {data:generateToken({firstName,lastName,email}),statusCode:200};
}

interface loginParms{
    email:string;
    password:string;
}

export const login =async({email,password}:loginParms)=>{
    const findUser=await userModel.findOne({email})
    if(!findUser){
        return {data:"Incorrect email or password",statusCode:400}; 
    }
const passwordMatch=await bcrypt.compare(password,findUser.password);
if(passwordMatch){
    return {data:generateToken({email,firstName:findUser.firstName,lastName:findUser.lastName}),statusCode:200};
}else{
    return {data:"Incorrect email or password",statusCode:400};
}

}

const generateToken=(data:any)=>{
return jwt.sign(data,process.env.JUT_SECRET_KEY||"",{expiresIn:"24 h"});
}