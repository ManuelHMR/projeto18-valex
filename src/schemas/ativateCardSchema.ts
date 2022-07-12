import joi from "joi";

const ativateCardSchema = joi.object({
    number: joi.string().length(23).pattern(/^[0-9]{5}\s[0-9]{5}\s[0-9]{5}\s[0-9]{5}$/).required(),
    securityCode: joi.string().length(3).pattern(/^[0-9]{3}$/).required(),
    password: joi.string().length(4).pattern(/^[0-9]{4}$/).required(),
    cardholderName: joi.string().required(),
    expirationDate: joi.string().pattern(/^[0-9]{2}\-[0-9]{2}$/).required()
});

export default ativateCardSchema;