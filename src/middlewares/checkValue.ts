import { NextFunction, Request, Response } from "express";

export function checkValue(req: Request, res: Response, next: NextFunction){
    const { quantity } = req.body;
    if(quantity <= 0){
        throw{
            status: 400,
            type:"invalidQuanity",
            message:"Invalid quantity!"
        }
    }
    next();
} 