const Sequelize = require("sequelize");
const  sequelize  = require("../util/database");

const ChatInfo = sequelize.define('message',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    message :{
         type:Sequelize.STRING,
         allowNull:false
    }

})

module.exports = ChatInfo