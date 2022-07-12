import joi from "joi";

const transactionSchema = joi.object({
    id: joi.number().required(),
    quantity: joi.number().required()
});

export default transactionSchema;