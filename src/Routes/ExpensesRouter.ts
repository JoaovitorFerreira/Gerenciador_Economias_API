import * as express from "express";
import controller from "../Controller/ExpensesController";

const app = express();

app.post("/expenses", controller.createExpense);
app.get("/expenses", controller.findAllExpenses);
app.get("/expenses/:id", controller.findExpense);
app.put("/expenses/:id", controller.updateExpense);
app.delete("/expenses/:id", controller.removeExpense);
app.delete("/expenses", controller.removeAllExpenses);

export { app as ExpensesRouter };
