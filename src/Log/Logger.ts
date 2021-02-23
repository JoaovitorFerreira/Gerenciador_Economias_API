import { createLogger, format, transports, Logger } from "winston";
import { MongoDB, MongoDBConnectionOptions } from "winston-mongodb";
const { combine, timestamp, label, printf } = format;
const db =
  process.env.MONGODB ||
  "mongodb+srv://genEcoUser:EconDb471@cluster1.g0kcq.mongodb.net/gerenciadorEconomia?retryWrites=true&w=majority";
const myFormat = format.printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

const finalMongoLogger: MongoDBConnectionOptions = {
  level: "info",
  db: db,
  collection: "logs_EconGenerator",
  capped: true,
  cappedMax: 20,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};

const logger = createLogger({
  transports: [new transports.Console(), new MongoDB(finalMongoLogger)],
  format: format.combine(
    label({ label: "EcoGenerator-api" }),
    format.timestamp(),
    myFormat
  ),
});

export { logger };
