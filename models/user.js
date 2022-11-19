const Sequelize = require("sequelize");
const  sequelize  = require("../util/database");

const ChatInfo = sequelize.define('ChatInfo',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    name:Sequelize.STRING,
    phoneNumber:Sequelize.STRING,
    email:{
        type:Sequelize.STRING,
        allowNull:false,
        unique:true
    },
    password:Sequelize.STRING
})

module.exports = ChatInfo;
