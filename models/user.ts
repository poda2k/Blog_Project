import { Sequelize , Model } from "sequelize";
import sequelize from './connection' ;
import { DataType } from "sequelize-typescript";

class user extends Model {
    public id!: number;
    public username!: string;
    public password!: string;
    public email!: string;
    public phone!: string;
    public isAdmin!: boolean;
}

user.init({
    id:{
        type: DataType.INTEGER,
        allowNull: false ,
        primaryKey : true,
        autoIncrement : true
    },
    username:{
        type: DataType.STRING,
        allowNull : false 
    },
    password:{
        type: DataType.STRING,
        allowNull : false 
    },
    email:{
        type: DataType.STRING,
        allowNull : false
    },
    phone:{
        type : DataType.INTEGER ,
        allowNull : true
    },
    isAdmin:{
        type : DataType.BOOLEAN ,
        allowNull : false
    }
},{
    sequelize ,
    modelName : 'user'
}) ;

export default user ;