import dotenv from "dotenv";
dotenv.config();

export default {
  development: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "user_db",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",

    // Use a different storage type. Default: sequelize
    migrationStorage: "json",

    // Use a different file name. Default: sequelize-meta.json
    migrationStoragePath: "sequelizeMeta.json",

    // Use a different table name. Default: SequelizeMeta
    migrationStorageTableName: "sequelize_meta",
  },
  test: {
    username: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_NAME || "user_db_test",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 3306,
    dialect: "mysql",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
  },
};
