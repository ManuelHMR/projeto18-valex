import { findById } from "../repositories/cardRepository";
import { checkPassword } from "../utils/checkPassword";
import { checkExpirationDate } from "./ativateCardServices";
import * as cardRepository from "../repositories/cardRepository"

export async function toggleCard(id: number, password: string, action: "block" | "unblock"){
    const card = await checkIfCardExist(id);
    checkExpirationDate(card.expirationDate);
    checkBlock(card.isBlocked, action);
    await checkPassword(password, card.password as string);
    await toggleBlock(id, action);
};

async function checkIfCardExist(id: number){
    const check = await findById(id);
    if(!check){
        throw{
            status: 404,
            type:"cardNotFound",
            message:"Card not found!"
        }
    }
    return check;
};

function checkBlock(isBlocked: boolean, action: "block" | "unblock"){
    if(isBlocked === true && action === "block"){
        throw{
            status: 400,
            type: "cardAlreadyBlocked",
            message: "This card is already blocked!"
        }
    }
    if(isBlocked === false && action === "unblock"){
        throw{
            status: 400,
            type: "cardAlreadyUnblocked",
            message: "This card is already unblocked!"
        }
    }
};

async function toggleBlock(id:number, action: "block" | "unblock"){
    if (action === 'block'){
        await cardRepository.update(id, { isBlocked: true});
    };
    if (action === 'unblock'){
        await cardRepository.update(id, { isBlocked: false});
    };
};