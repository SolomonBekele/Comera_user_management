import { Client } from "@elastic/elasticsearch";
import winston from "winston";
import { ElasticsearchTransport } from "winston-elasticsearch";
import morgan from "morgan";

// Elasticsearch client
const esClient = new Client({ node: "http://localhost:9200" });

// Winston Elasticsearch transport
const esTransportOpts = {
  level: "info", // minimum log level to send
  client: esClient,
  indexPrefix: "app-logs", // logs will go into indices like app-logs-2025.10.01
};


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
    new ElasticsearchTransport(esTransportOpts),
  ],
});

export default logger;
