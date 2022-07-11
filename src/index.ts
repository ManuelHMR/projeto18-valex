import express from "express";
import cors from "cors";
import "express-async-errors";

import router from "./routers/index";
import errorHandler from "./middlewares/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());
app.use(router);
app.use(errorHandler);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Servidor ligado na porta ${port}`));