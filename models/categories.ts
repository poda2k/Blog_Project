import { DataType } from "sequelize-typescript";
import { Model } from "sequelize";
import sequelize from './connection' ;


class categories extends Model {
    public id!:number ;
    public name!:string ;
}

categories.init({

    id: {
        type : DataType.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    name: {
        type : DataType.STRING,
        allowNull : false
    }

},{
    sequelize,
    modelName : 'categories',
})

export default categories ;