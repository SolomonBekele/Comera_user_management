import * as fileRepo from "./file-storage/fileUserRepo.js";
import * as mysqlRepo from "./mysql/mysqlUserRepo.js";
import * as sequelizeRepo from "./sequelize/sequelizeUserRepo.js";

const STORAGE_TYPE = process.env.STORAGE_TYPE || "file";

let repo;
if (STORAGE_TYPE === "sequelize") {
  repo = sequelizeRepo;
} else if (STORAGE_TYPE === "mysql") {
  repo = mysqlRepo;
} else {
  repo = fileRepo;
}

export default repo;
