import { Client } from "@elastic/elasticsearch";
import winston from "winston";
import { ElasticsearchTransport } from "winston-elasticsearch";
import morgan from "morgan";
import path from "path";
import fs from "fs";

// Ensure logs folder exists
const logDir = path.join(process.cwd(), "src", "logs");
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Elasticsearch client
const esClient = new Client({ node: process.env.ELASTICSEARCH || "http://localhost:9200" });

// Winston Elasticsearch transport
const esTransportOpts = {
  level: "info", // minimum log level to send
  client: esClient,
  indexPrefix: "app-logs", // logs will go into indices like app-logs-2025.10.01
};


const logger = winston.createLogger({
  llevel: process.env.NODE_ENV === "production" ? "info" : "debug",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true })
  ),
  transports: [
    // Console -> pretty with colors
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.timestamp(),
        winston.format.printf(({ level, message, timestamp, stack }) => {
          return `${timestamp} [${level}]: ${stack || message}`;
        })
      )
    }),

    // File -> JSON logs
    new winston.transports.File({
      filename: path.join(logDir, "combined.log"),
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),

    // Error file -> JSON logs
    new winston.transports.File({
      filename: path.join(logDir, "error.log"),
      level: "error",
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    new ElasticsearchTransport(esTransportOpts),
  ],
});

export default logger;
