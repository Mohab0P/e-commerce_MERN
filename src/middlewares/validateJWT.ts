import { NextFunction,Request,Response } from "express";
import jwt from "jsonwebtoken";
import { userModel } from "../models/userModels";

export interface ExtendedRequest extends Request{
    user?:any;
}
export const validateJWT = (req: ExtendedRequest, res: Response, next: NextFunction): void => {

    const authorization = req.get('Authorization');

    if (!authorization) {

        res.status(403).send("Authorization header is required");

        return;

    }

    const token = authorization.split(' ')[1];

    if (!token) {

        res.status(403).send("Bearer token not found");

        return;

    }

    jwt.verify(token, "kcwTGC_#M~(7OXQ.r<8]", async (err, payload) => {

        if (err) {

            res.status(403).send("Invalid token");

            return;

        }

        if (!payload) {

            res.status(403).send("Invalid payload");

            return;

        }

        const userPayload = payload as { email: string };

        
        const user = await userModel.findOne({ email: userPayload.email });
        req.user = user;


        next();

    });

}
