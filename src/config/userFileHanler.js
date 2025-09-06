import fs from "fs/promises"

export const readUsersFile = async () => {
    try {
        const usersData = await fs.readFile("./users.txt", "utf8")
        return usersData
    } catch (err) {
        throw new Error("error in fileHandler: " + err.message)
    }
}
export const writeUsersFile = async (newUsers) =>{
    try {
        await fs.writeFile("./users.txt", newUsers, "utf8");
    } catch (err) {
        throw new Error("error in fileHandler: " + err.message)
    }

}
