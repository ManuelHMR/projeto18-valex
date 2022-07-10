import express from "express";

import cardRouter from "./card.js";

const router = express.Router();
router.use(cardRouter);

export default router;
