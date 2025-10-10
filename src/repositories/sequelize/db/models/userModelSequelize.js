import { DataTypes } from "sequelize";
import sequelize from "../../config/sequelize.js";

let User = null;
if(process.env.STORAGE_TYPE ==="sequelize"){
User = sequelize.define("User", {
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
},
{
    indexes: [
      {
        name: "idx_user_status", // custom index name
        fields: ["status"],       // column(s) to index
      },
      {
        name: "idx_user_email",
        unique: true,            
        fields: ["email"], 
      },
    ],
  }
);
}
export default User;
