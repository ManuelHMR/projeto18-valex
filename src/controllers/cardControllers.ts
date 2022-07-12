import { Request, Response } from "express";
import { insert, TransactionTypes } from "../repositories/cardRepository";
import { ativateCard, ativateCardBusinessRules } from "../services/ativateCardServices";
import { checkIfWorkerExist, checkIfWorkerAlreadyHaveCard, generateCardData } from "../services/createCardServices";
import { toggleCard } from "../services/toggleBlock";
import { getTransactionsService } from "../services/transactionServices";
import { charge, expense } from "../services/chargeServices";

export async function createCardController(req: Request, res: Response) {
    const {workerIdentifier : employeeId, cardType} : {workerIdentifier: number, cardType: TransactionTypes} = req.body;
    const worker = await checkIfWorkerExist(employeeId, cardType);
    await checkIfWorkerAlreadyHaveCard(employeeId, cardType);
    const genetetedData = generateCardData(worker);
    const card = {
        employeeId,
        number: genetetedData.number,
        cardholderName: genetetedData.cardholderName,
        securityCode: genetetedData.secutityCode,
        expirationDate: genetetedData.expirationDate,
        password: undefined,
        isVirtual: false,
        originalCardId: undefined,
        isBlocked: true,
        type: cardType,
    }
    await insert(card);
    return res.sendStatus(201); 
};

export async function ativateCardCrontroller(req: Request, res: Response) {
    const {
        number, 
        cardholderName, 
        password, 
        expirationDate, 
        securityCode} 
    : {
        number: string, 
        cardholderName: string, 
        expirationDate: string , 
        password: string, 
        securityCode: string
    } = req.body;
    const id = await ativateCardBusinessRules(number, cardholderName, expirationDate , password, securityCode);
    await ativateCard(id, password);
    return res.sendStatus(200);
};

export async function getTransactionsController (req: Request, res: Response) {
    const id  = parseInt(req.params.id);
    const balance = await getTransactionsService(id);
    res.send(balance);
};

export async function blockCardController(req: Request, res: Response) {
    const {id, password} : {id: number, password: string} = req.body;
    await toggleCard(id, password, "block");
    return res.sendStatus(200);
};

export async function unblockCardController(req: Request, res: Response) {
    const {id, password} : {id: number, password: string} = req.body;
    await toggleCard(id, password, "unblock");
    return res.sendStatus(200);
};

export async function rechargeController(req: Request, res: Response){
    const { id, quantity } : { id: number, quantity:number }= req.body;
    charge(id, quantity);
    res.sendStatus(200);
};

export async function expenseController(req: Request, res: Response){
    const { id, quantity, password, businessId } : { id: number, quantity:number, password: string, businessId: number }= req.body;
    expense(id, quantity, password, businessId);
    res.sendStatus(200);
};