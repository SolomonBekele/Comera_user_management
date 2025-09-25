import * as fileRepo from "./file-storage/fileBookRepo.js";
import * as mysqlRepo from "./mysql/mysqlBookRepo.js";
import * as sequelizeRepo from "./sequelize/sequelizeBookRepo.js";

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
