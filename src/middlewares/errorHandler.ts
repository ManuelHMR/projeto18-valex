import { NextFunction, Request, Response  } from "express";

export default function errorHandler(error: {status: number, type: string, message: string}, req : Request, res : Response, next: NextFunction){
    console.log(error)
    if(!error.status || !error.message){
        console.log(error);
        return res.status(500).send("Internal Server Error");
    };
    return res.status(error.status).send(error.message);
};