import express from "express";

import cardRouter from "./cardRouter";

const router = express.Router();
router.use(cardRouter);

export default router;
