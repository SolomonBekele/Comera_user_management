import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.js";

const User = sequelize.define("User", {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  first_name: DataTypes.STRING,
  last_name: DataTypes.STRING,
  email: { type: DataTypes.STRING, unique: true },
  password: DataTypes.STRING,
  role: DataTypes.STRING,
  language: DataTypes.STRING,
  status: DataTypes.STRING,
}, {
  tableName: "users",
  timestamps: false,
});

export default User;