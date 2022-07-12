import express from "express";

import { apiKeyValidation } from "../middlewares/apiKeyValidation";
import createCardSchema from "../schemas/createCardSchema";
import ativateCardSchema from "../schemas/ativateCardSchema";
import { validateSchema } from "../middlewares/validateSchema";
import { 
    ativateCardCrontroller,
    blockCardController, 
    createCardController, 
    getTransactionsController, 
    unblockCardController
} from "../controllers/cardControllers";
import idPasswordSchema from "../schemas/idPasswordSchema";
import transactionSchema from "../schemas/transactionSchema";
import { checkValue } from "../middlewares/checkValue";

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

cardRouter.get(
    "/transations/:id",
    getTransactionsController
);

cardRouter.post(
    "/block-card",
    validateSchema(idPasswordSchema),
    blockCardController
);

cardRouter.post(
    "/unblock-card",
    validateSchema(idPasswordSchema),
    unblockCardController
);

cardRouter.post(
    "/recharge",
    validateSchema(transactionSchema),
    checkValue,
    
);

export default cardRouter;