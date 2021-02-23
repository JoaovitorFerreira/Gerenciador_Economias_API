import * as mongoose from "mongoose";

export default (db: string) => {
  const connect = () => {
    mongoose
      .connect(db, { useNewUrlParser: true })
      .then(() => {
        return console.log(`Conectaco ao banco ${db}`);
      })
      .catch((error) => {
        console.log("Erro ao conectar ao banco:", error);
        return process.exit(1);
      });
  };
  connect();

  mongoose.connection.on("Disconectado", connect);
};
