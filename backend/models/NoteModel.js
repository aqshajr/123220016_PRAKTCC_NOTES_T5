import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Note = db.define('notes', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    category: DataTypes.STRING,
},{
    freezeTableName: 'true'
})

export default Note;

//fungsi utk menggenerate table jika tidak ada tabel user di db
(async()=>{
    await db.sync();
})();
