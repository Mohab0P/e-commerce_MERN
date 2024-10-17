import mongoose,{Schema,Document} from "mongoose";


export interface Iproduct extends Document {
    name: string;
    image: string;
    price: number;
    countInStock: number;
}

const productSchema=new Schema<Iproduct>({
    name:{type:String,required:true},
    image:{type:String,required:true},
    price:{type:Number,required:true},
    countInStock:{type:Number,required:true, default:0}
})    

export const productModel=mongoose.model<Iproduct>('Product',productSchema);