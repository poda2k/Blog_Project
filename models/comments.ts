import { DataType } from 'sequelize-typescript';
import sequelize from './connection' ;
import { Model } from 'sequelize';

class comments extends Model {
    public id!: number;
    public content!: string;
    public userId!: number;
    public postId!: number;
}

comments.init({
    id:{
        type: DataType.INTEGER,
        allowNull : false,
        autoIncrement : true,
        primaryKey : true
    },
    userId:{
        type: DataType.INTEGER,
        allowNull : false
    },
    postId:{
        type : DataType.INTEGER,
        allowNull : false
    },
    content: {
        type: DataType.STRING ,
        allowNull : false
    }
},{
 sequelize ,
 modelName: 'comments',
});


export default comments;