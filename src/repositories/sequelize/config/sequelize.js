import { Sequelize } from "sequelize";
import logger from "../../../utils/logger.js";
let sequelize = null;
if(process.env.STORAGE_TYPE ==="sequelize"){
sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: (msg) => logger.debug(msg), // log SQL queries
  }
);


(async () => {
  try {
    await sequelize.authenticate();
    logger.info(" Sequelize Database connection established successfully.");
  } catch (error) {
    logger.error("Unable to connect to the database", { stack: error.stack });
    process.exit(1); // optional: stop app if DB connection fails
  }
})();
}
export default sequelize;