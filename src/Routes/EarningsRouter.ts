import * as express from "express";
import controller from "../Controller/EarningsController";

const app = express();

app.post("/earnings", controller.createEarning);
app.get("/earnings", controller.findAllEarnings);
app.get("/earnings/:id", controller.findEarning);
app.put("/earnings/:id", controller.updateEarning);
app.delete("/earnings/:id", controller.removeEarning);
app.delete("/earnings", controller.removeAllEarnings);

export { app as EarningsRouter };
