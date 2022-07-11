import express from "express";

import { apiKeyValidation } from "../middlewares/apiKeyValidation";
import createCardSchema from "../schemas/createCardSchema";
import { validateSchema } from "../middlewares/validateSchema";
import { createCardController } from "../controllers/cardControllers";

const createCardRouter = express.Router();
createCardRouter.post(
    "/create-card", 
    validateSchema(createCardSchema), 
    apiKeyValidation, 
    createCardController);

export default createCardRouter;