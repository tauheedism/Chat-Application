const path = require("path");

const express = require("express");
const cors = require('cors')
const dotenv=require('dotenv');

const bodyParser = require("body-parser");


// Backend Routes
const sequelize = require("./util/database");
const userRoutes=require('./routes/user')
const chatRoutes = require('./routes/message')
const app = express();

// Models
const User=require('./models/user');
const userModel = require('./models/user')
const chatModel = require('./models/message')
const Group = require('./models/group')
const userGroup = require('./models/userGroup');

// Associations
userModel.hasMany(chatModel);
chatModel.belongsTo(userModel);

userModel.hasMany(userGroup)
Group.hasMany(userGroup)

Group.hasMany(chatModel)
chatModel.belongsTo(Group)

userGroup.belongsTo(userModel)
userGroup.belongsTo(Group)

app.use(cors());
dotenv.config();

// app.use(bodyParser.urlencoded({extended:false}));//thsi is for handling forms 
app.use(bodyParser.json());  //this is for handling jsons

// Frontend routes
app.use(userRoutes);
app.use(chatRoutes);

sequelize
  // .sync({ force: true })
  .sync()
  .then(() => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
