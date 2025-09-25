import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.js";

export const Book = sequelize.define("Book",{
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    publication_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    publisher: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "books",
    timestamps: true, // set to true if you want createdAt/updatedAt
  }
);

export default Book;