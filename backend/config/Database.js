import { Sequelize } from "sequelize";

const db = new Sequelize('123220016_webnote', 'root', 'mynotebook', {
    host: '34.69.156.211',
    dialect: 'mysql'
});

export default db;