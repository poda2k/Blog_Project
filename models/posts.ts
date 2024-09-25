import { Sequelize , Model } from "sequelize";
import sequelize from './connection';
import { DataType } from "sequelize-typescript";

class posts extends Model{
    public id!:number;
    public title!:string;
    public description!:string;
    public content!:string;
    public user_id!:number;
    public image_url!:string;
}

posts.init({
    id:{
        type : DataType.INTEGER ,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    title:{
        type : DataType.STRING ,
        allowNull : false
    },
    description:{
        type : DataType.STRING ,
        allowNull : true
    },
    content:{
        type : DataType.STRING ,
        allowNull : false
    },
    user_id:{
        type : DataType.INTEGER ,
        allowNull : false
    },
    image_url:{
        type : DataType.STRING ,
        allowNull : true
    }
},{
    sequelize ,
    modelName : 'posts'
});

export default posts ;