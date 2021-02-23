const port = 3003;
import * as express from "express";
import * as bodyParser from "body-parser";
import connect from "./src/Database/DbCon";
import { EarningsRouter } from "./src/Routes/EarningsRouter";
import { ExpensesRouter } from "./src/Routes/ExpensesRouter";
import { cors } from "cors";
const db =
  process.env.MONGODB ||
  "mongodb+srv://genEcoUser:EconDb471@cluster1.g0kcq.mongodb.net/gerenciadorEconomia?retryWrites=true&w=majority";

//inicia a app
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

try {
  connect(process.env.MONGODB || db);
  app.use(ExpensesRouter);
  app.use(EarningsRouter);
  /*app.use(
    cors({
      origin: "https://igti-modulo4-desafio.herokuapp.com",
    })
  );
  */
  app.listen(process.env.PORT || port, () => {
    console.log(`Servidor disponível: http://127.0.0.1:${port}/`);
  });
} catch (error) {
  console.log(error);
}
