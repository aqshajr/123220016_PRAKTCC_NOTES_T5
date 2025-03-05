import { Sequelize } from "sequelize";

const db = new Sequelize('webnote_aqsha', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

export default db;