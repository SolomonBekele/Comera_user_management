import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.js";
import  User  from "./userModelSequelize.js";
import  Book  from "./bookModelSequelize.js";
let Borrowing = null;
if(process.env.STORAGE_TYPE ==="sequelize"){
Borrowing = sequelize.define(
  "Borrowing",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    borrowDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    returnDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "borrowings",
    timestamps: false,
  }
);

User.belongsToMany(Book, { through: Borrowing, foreignKey: "userId", as: "borrowedBooks" });
Book.belongsToMany(User, { through: Borrowing, foreignKey: "bookId", as: "borrowers" });
}

export { User, Book, Borrowing };