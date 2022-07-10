import express from "express";

import { apiKeyValidation } from "../middlewares/apiKeyValidation.js";
import createCardSchema from "../schemas/createCardSchema.js";
import { validateSchema } from "../middlewares/validateSchema.js";
import { createCardController } from "../controllers/cardControllers.js";

const cardRouter = express.Router();
cardRouter.post("/create-card", validateSchema(createCardSchema), apiKeyValidation, createCardController);

export default cardRouter;