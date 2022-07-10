import { NextFunction, Request, Response } from "express";
import { findByApiKey } from "../repositories/companyRepository.js";

export async function apiKeyValidation( req: Request, res: Response, next: NextFunction) {
    const key : string = req.headers["x-api-key"].toString();
    const verification = await findByApiKey(key);
    if(!verification){
        throw{
            status: 400,
            type:"invalidApiKey",
            message:"Invalid API key!"
        }
    };
    next()
};