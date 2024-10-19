import { Model } from "sequelize";
import sequelize from './connection';
import { DataType } from "sequelize-typescript";


export default class cat_post extends Model {
    public categoryId!:number ;
    public postId!:number ;
}

cat_post.init({
    categoryId :{
        type : DataType.INTEGER,
        allowNull : false
    },
    postId :{
        type : DataType.INTEGER,
        allowNull : false
    }
},{
    sequelize,
    modelName : "cat_post",
})