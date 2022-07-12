import { Request, Response } from "express";

import { insert, TransactionTypes } from "../repositories/cardRepository";
import { ativateCard, ativateCardBusinessRules } from "../services/ativateCardServices";
import { checkIfWorkerExist, checkIfWorkerAlreadyHaveCard, generateCardData } from "../services/createCardServices";

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