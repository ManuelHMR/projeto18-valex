import express from "express";

import { apiKeyValidation } from "../middlewares/apiKeyValidation";
import createCardSchema from "../schemas/createCardSchema";
import ativateCardSchema from "../schemas/ativateCardSchema";
import { validateSchema } from "../middlewares/validateSchema";
import { ativateCardCrontroller, createCardController } from "../controllers/cardControllers";

const cardRouter = express.Router();
cardRouter.post(
    "/create-card", 
    validateSchema(createCardSchema), 
    apiKeyValidation, 
    createCardController
);

cardRouter.post(
    "/ativate-card", 
    validateSchema(ativateCardSchema),
    ativateCardCrontroller
);

export default cardRouter;