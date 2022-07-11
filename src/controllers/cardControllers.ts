import { Request, Response } from "express";

import { insert, TransactionTypes } from "../repositories/cardRepository";
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