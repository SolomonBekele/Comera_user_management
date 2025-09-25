import { Sequelize } from "sequelize";


let sequelize = null;

sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: process.env.DB_HOST,
      dialect: "mysql",
      logging: true,
    }
  );


export default sequelize;
