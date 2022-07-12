import { findById } from "../repositories/cardRepository";
import * as rechargeRepository from "../repositories/rechargeRepository"
import * as paymentRepository from "../repositories/paymentRepository";

export async function getTransactionsService(id:number) {
    await checkCardId(id);
    const recharges = await rechargeRepository.findByCardId(id);
    const transactions = await paymentRepository.findByCardId(id);
    const balance = makeBalance(recharges, transactions);
    return {balance, recharges, transactions}
};

async function checkCardId(id:number){
    const check = await findById(id);
    if(!check){
        throw{
            status: 404,
            type:"cardNotFound",
            message:"Card not found!"
        }
    };
};

function makeBalance(recharges: rechargeRepository.Recharge[], transactions: paymentRepository.PaymentWithBusinessName[]){
    let totalPayment = 0;
    let totalCredits = 0;
  
    transactions.forEach((payment: paymentRepository.PaymentWithBusinessName) => {
      totalPayment = totalPayment + payment.amount ;
    });
  
    recharges.forEach((credit:rechargeRepository.Recharge) => {
      totalCredits = totalCredits + credit.amount ;
    });
  
    return totalCredits - totalPayment;
};