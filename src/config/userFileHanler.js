import fs from "fs/promises"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readUsersFile = async () => {
    try {
        const filePath = path.join(__dirname, "users.txt"); 
        const usersData = await fs.readFile(filePath, "utf8");
        return usersData
    } catch (err) {
        throw new Error("error in fileHandler: " + err.message)
    }
}
export const writeUsersFile = async (newUsers) =>{
    try {
        const filePath = path.join(__dirname, "users.txt"); 
        await fs.writeFile(filePath, newUsers, "utf8");
    } catch (err) {
        throw new Error("error in fileHandler: " + err.message)
    }

}