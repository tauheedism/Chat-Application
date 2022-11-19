const User = require("../models/user");
const bcrypt = require("bcrypt");

function stringValidator(string) {
  if (string == undefined || string.length === 0) {
    return true;
  } else {
    return false;
  }
}

exports.signup = async (req, res) => {
  try {
    const { name, email ,phoneNumber, password} = req.body;
    if (
      stringValidator(name) ||
      stringValidator(email) ||
      stringValidator(phoneNumber)||
      stringValidator(password)
    ) {
      return res
        .status(400)
        .json({ err: "Bad Parameters . Something is missing" });
    }
    User.findAll({where:{email : email}})
        .then(users =>{
            if(users.length === 1)
            {
                 res.status(402).json({message:"User already exists, Please Login"})
            }
            else
            {
              const saltrounds = 10;
              bcrypt.hash(password, saltrounds, async (err, hash) => {
                console.log(err);
                await User.create({name, email,phoneNumber,password:hash});
                res.status(201).json({ message: "Successfully created new user" });
              });
            }
        })
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

