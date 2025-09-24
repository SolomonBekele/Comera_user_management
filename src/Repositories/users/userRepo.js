import * as fileRepo from "./fileUserRepo.js";
import * as mysqlRepo from "./mysqlUserRepo.js";
import * as sequelizeRepo from "./sequelizeUserRepo.js";

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
