import joi from "joi";

const idPasswordSchema = joi.object({
    id: joi.number().required(),
    password: joi.string().length(4).pattern(/^[0-9]{4}$/).required()
});

export default idPasswordSchema;