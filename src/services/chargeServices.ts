import { checkExpirationDate } from "./ativateCardServices";
import { checkIfCardExist } from "./toggleBlock";
import * as rechargeRepository from "../repositories/rechargeRepository";
import * as paymentRepository from "../repositories/paymentRepository";
import * as businessRepository from "../repositories/businessRepository";
import { checkPassword } from "../utils/checkPassword";
import { TransactionTypes } from "../repositories/cardRepository";
import { getTransactionsService } from "./transactionServices";
import { findById } from "../repositories/employeeRepository";

export async function charge(id: number, quantity: number, businessId: number) {
    const card = await checkIfCardExist(id);
    await checkIfWorkInTheBusiness(card.employeeId, businessId);
    checkIfBlocked(card.isBlocked);
    checkExpirationDate(card.expirationDate);
    checkIfActivated(card);
    await rechargeRepository.insert({cardId:id, amount:quantity })
};

async function checkIfWorkInTheBusiness(employeeId: number, businessId: number){
    const employee = await findById(employeeId);
    if(employee.companyId !== businessId){
        throw{
            status:400,
            message:"Not your worker!"
        };
    };
};

function checkIfBlocked(param : boolean){
    if(param){
        throw{
            status:400,
            type:"cardBlocked",
            message: "This card is blocked"
        }
    }
};

function checkIfActivated(card: any){
    if(!card.password){
        throw{
            status:400,
            message:"Card not activated!"
        }
    }
}

export async function expense(id:number, quantity: number, password:string, businessId: number) {
    const card = await checkIfCardExist(id);
    checkIfBlocked(card.isBlocked);
    checkExpirationDate(card.expirationDate);
    checkIfActivated(card);
    checkPassword(password, card.password as string);
    const business = await businessRepository.findById(businessId);
    checkIfBusinessExist(business);
    checkBusinessType(card.type, business.type);
    const balance = await getTransactionsService(id);
    checkIfEnoughCredit(balance.balance, quantity);
    await paymentRepository.insert({
        cardId: card.id, 
        businessId,
        amount: quantity
    });
};

function checkIfBusinessExist(business: businessRepository.Business | undefined){
    if (!business){
        throw{
            status: 404,
            message:"Business not registered!"
        }
    }
}
function checkBusinessType(cardType: TransactionTypes, businessType: TransactionTypes){
    if(cardType !== businessType){
        throw{
            status: 400,
            message: "Wrong business type"
        }
    };
};
function checkIfEnoughCredit(credit:number, expense: number){
    if(expense > credit){
        throw{
            status:400,
            message:"You`re broke, maninho! Not enough money!"
        };
    };
};