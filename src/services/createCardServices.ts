import { faker } from '@faker-js/faker';
import dayjs from "dayjs";
import dotenv from "dotenv";
dotenv.config();

import { TransactionTypes, findByTypeAndEmployeeId } from "../repositories/cardRepository";
import { findById } from "../repositories/employeeRepository";

import Cryptr from "cryptr";
const key = process.env.CRYPT_KEY as string;
const cryptr = new Cryptr(key);

export async function checkIfWorkerExist(workerIdentifier: number, cardType: TransactionTypes) {
    const verification = await findById(workerIdentifier);
    if(!verification){
        throw{
            status: 404,
            type:"workerNotFound",
            message:"Worker not found!"
        }
    };
    return verification;
};

export async function checkIfWorkerAlreadyHaveCard(workerIdentifier: number, cardType: TransactionTypes) {
    const verification = await findByTypeAndEmployeeId(cardType, workerIdentifier);
    if(verification){
        throw{
            status: 409,
            type:"workerAlreadyHaveCard",
            message:"Worker already have this kind of card!"
        }
    };
};

function adaptName(info: any){
    let name = info.fullName;
    let namesArray = name.split(' ')
    let firstName = namesArray[0];
    let lastName = namesArray[namesArray.length - 1];
    let output = []
    for (let i = 0; i < namesArray.length; i++) {
          if (namesArray[i] === firstName || namesArray[i] === lastName) {
              output.push(namesArray[i].toUpperCase())
          } else if (namesArray[i].length > 3){
              let letters = namesArray[i].split('')
              output.push(letters[0])
          }
      };
    return output.join(' ');
};

function generateCardNumber(){
    const accountNumber = [];
    for(let i = 0; i < 4; i++){
        const number = faker.finance.account(5)
        accountNumber.push(number);
    }
    return accountNumber.join(" ");
};

function generateExpirationData(){
    const now = dayjs().format("MM-YY");
    const date = now.split("-");
    const endYear = addYears(date[1]);
    date.pop();
    date.push(endYear);
    return date.join("-");
};

function addYears(year : string) : string{
    let startYear = Number(year);
    let endYear = startYear + 5;
    return endYear.toString()
};

function generateSecurityNumber(){
    return faker.finance.account(3);
};

export function generateCardData(worker: any){
    const cardholderName = adaptName(worker);
    const number = generateCardNumber();
    const expirationDate = generateExpirationData();
    const secutityCode = generateSecurityNumber();
    return {
        cardholderName,
        number,
        expirationDate,
        secutityCode: cryptr.encrypt(secutityCode),
        notEncryptedCVC: secutityCode
    };
}