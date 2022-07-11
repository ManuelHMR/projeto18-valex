import express from "express";

import createCardRouter from "./createCardRouter";

const router = express.Router();
router.use(createCardRouter);

export default router;
