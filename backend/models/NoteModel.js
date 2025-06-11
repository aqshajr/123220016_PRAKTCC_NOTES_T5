import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";

const {DataTypes} = Sequelize;

const Note = db.define('notes', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }
},{
    freezeTableName: 'true'
})

// Define associations
User.hasMany(Note, { foreignKey: 'userId' });
Note.belongsTo(User, { foreignKey: 'userId' });

export default Note;

//fungsi utk menggenerate table jika tidak ada tabel user di db
(async()=>{
    await db.sync({ alter: true }); // alter: true akan menambahkan kolom baru tanpa hapus data
})();
