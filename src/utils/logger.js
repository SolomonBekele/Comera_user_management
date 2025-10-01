import winston from "winston";
import morgan from "morgan";

const logger = winston.createLogger({
  level: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp()
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ level, message, timestamp, stack }) => {
          return `${timestamp} [${level}]: ${stack || message}`;
        })
      ),
    }),
    new winston.transports.File({ filename: "error.log", level: "error", format: winston.format.combine(
      winston.format.printf(({ level, message, timestamp, stack }) => `${timestamp} [${level}]: ${stack || message}`)
    )}),
    new winston.transports.File({ filename: "combined.log", format: winston.format.combine(
      winston.format.printf(({ level, message, timestamp, stack }) => `${timestamp} [${level}]: ${stack || message}`)
    )}),
  ],
});

export default logger;
