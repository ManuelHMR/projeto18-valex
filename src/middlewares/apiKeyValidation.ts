import { NextFunction, Request, Response } from "express";
import { findByApiKey } from "../repositories/companyRepository";

export async function apiKeyValidation( req: Request, res: Response, next: NextFunction) {
    const key = req.headers["x-api-key"] as string;
    const verification = await findByApiKey(key);
    if(!verification){
        throw{
            status: 400,
            type:"invalidApiKey",
            message:"Invalid API key!"
        };
    };
    next();
};