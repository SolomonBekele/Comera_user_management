import morgan from "morgan";
import logger from "./logger.js"; 
import winston from "winston";

// Map status codes to Winston colors
const statusColorize = (status) => {
  if (status >= 500) return winston.format.colorize().colorize("error", status);
  if (status >= 400) return winston.format.colorize().colorize("warn", status);
  if (status >= 300) return winston.format.colorize().colorize("info", status);
  if (status >= 200) return winston.format.colorize().colorize("debug", status);
  return status;
};

// Custom Morgan format
const customFormat = (tokens, req, res) => {
  return [
    // tokens.date(req, res, "iso"),
    tokens.method(req, res),
    tokens.url(req, res),
    statusColorize(res.statusCode),
    tokens["response-time"](req, res) + " ms"
  ].join(" ");
};


const morganLogger = morgan("tiny", {
  stream: {
    write: (message) => logger.http(message.trim())
  }
});

export default morganLogger;
