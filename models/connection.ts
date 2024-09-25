import { Sequelize } from "sequelize";

const dataBaseConnection = new Sequelize({
    dialect: "postgres",
    host:'localhost',
    port: 5432,
    username: 'postgres' ,
    password: '',
    database: 'theBlogger',
});

export default dataBaseConnection ;