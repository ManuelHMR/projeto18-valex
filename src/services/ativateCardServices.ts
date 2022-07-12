import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config();

import { findByCardDetails, update } from "../repositories/cardRepository";

import bcrypt from "bcrypt";
import Cryptr from "cryptr";
const key = process.env.CRYPT_KEY as string;
const cryptr = new Cryptr(key);

export async function ativateCardBusinessRules(number: string, cardholderName: string, expirationDate: string , password: string, securityCode: string) {
    const result = await findByCardDetails(number, cardholderName, expirationDate);
    if(!result){
        throw{
            status: 400,
            type:"invalidData",
            message:"Card not found!"
        };
    };
    checkExpirationDate(result.expirationDate);
    checkIfAlreadyAtivated(result.isBlocked)
    checkCVC(result.securityCode, securityCode);
    return result.id;
};

export function checkExpirationDate(date:string){
    const expiration = parseInt(date.split("-")[1]);
    const now = parseInt(dayjs().format("YY"));
    if(expiration - now < 0){
        throw{
            status: 400,
            type:"cardExpired",
            message:"Card Expired!"
        };
    }
};

function checkIfAlreadyAtivated(isBlocked : boolean | undefined){
    if(!isBlocked){
        throw{
            status: 400,
            type:"cardAlreadyAtivated",
            message:"Card already ativated!"
        };
    }
};

function checkCVC(encryptedCVC: string, securityCode: string){
    const desencrypted = cryptr.decrypt(encryptedCVC);
    if(desencrypted !== securityCode){
        throw{
            status: 400,
            type:"invalidCVC",
            message:"Invalid security code!"
        };
    }
};

export async function ativateCard(id: number, password: string) {
    const passwordHash = await bcrypt.hash(password, 10);
    await update(id, {
        password: passwordHash,
        isBlocked: false
    });
};
