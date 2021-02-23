import * as express from "express";
import * as bodyParser from "body-parser";
import connect from "./src/Database/DbCon";
import { EarningsRouter } from "./src/Routes/EarningsRouter";
import { ExpensesRouter } from "./src/Routes/ExpensesRouter";
import { cors } from "cors";
import {MONGODB} from "./config";

const db = process.env.MONGODB || MONGODB;
const localPort = 3003;

//inicia a app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

try {
  connect(db);
  app.use(ExpensesRouter);
  app.use(EarningsRouter);
  app.listen(process.env.PORT || localPort, () => {
    console.log(`Servidor disponível: http://127.0.0.1:${port}/`);
  });
} catch (error) {
  console.log(error);
}
