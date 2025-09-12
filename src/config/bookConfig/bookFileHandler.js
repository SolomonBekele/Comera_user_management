import fs from "fs/promises"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readBooksFile = async () => {
    try {
        const filePath = path.join(__dirname, "books.txt"); 
        const usersData = await fs.readFile(filePath, "utf8");
        return usersData
    } catch (err) {
        throw new Error("error in Book File Handler: " + err.message)
    }
}
export const writeBooksFile = async (newBooks) =>{
    try {
        const filePath = path.join(__dirname, "books.txt"); 
        await fs.writeFile(filePath, newBooks, "utf8");
    } catch (err) {
        throw new Error("error in Book File Handler: " + err.message)
    }

}