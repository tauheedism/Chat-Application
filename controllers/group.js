const groupChat = require('../models/group')
const userGroup = require('../models/userGroup')
const Message = require('../models/message')
const user = require('../models/user')
const message = require('../models/message')

exports.groupMessage = (req,res)=>{
    const GroupName = req.body.groupChatting;
     console.log(GroupName);
     groupChat.create({GroupName})
     .then(group =>{
       const groupId = group.id;
       userGroup.create({groupChatId: groupId, userId : req.user.id , isAdmin:true})
       .then(userGroup =>{
        res.status(201).json({message:"created"})
       })
     })
     .catch(err =>{
         console.log(err)
        res.status(500).json({message:"failed"})
     })      
 }

 exports.groupdetails = (req,res)=>{
  userGroup.findAll({where:{userId:req.user.id},isAdmin:true,include: [
    {
      model: groupChat,
      required: false,
    }
  ]})
  .then(result =>{
    res.status(200).json({data:result,user:req.user,message:"success"})
  })
  .catch(err =>{
    res.status(500).json({message:"failed"})
  })
 }

exports.postMessage =(req,res)=>{
  const groupId = req.params.id;
  const message = req.body.message;
  Message.create({message:message ,groupChatId : groupId , userId : req.user.id })
  .then(result =>{
    console.log(result)
    res.status(201).json({message:"created"})
  })
  .catch(err =>{
    console.log(err)
    res.status(500).json({message:"failed"}) 
  })
}

exports.getMessage = (req,res)=>{
  const groupid = req.params.id;
    Message.findAll({where:{groupChatId:groupid},include: [
      {
        model: user,
        required: false,
      }
    ]})
  .then(result =>{
   res.status(200).json({data:result,message:"success"})
  })
  .catch(err=>
   res.status(500).json({message:"failed"}))
}

exports.addUser = (req,res)=>{
  const name = req.body.user;
  const groupid = req.params.id;
  user.findOne({where :{name:name}})
  .then(user =>{
    console.log(user.id,"userid Tauheed siddiqui ")
    userGroup.create({userId:user.id,groupChatId:groupid , isAdmin:false})
    .then(result=>{
      res.status(201).json({message:"created"})
    })
  })
  .catch(err=>{
   res.status(500).json({message:"failed"})
  })
}

exports.getUser = (req,res)=>{
  const groupid = req.params.id;
  userGroup.findAll({where:{groupChatId:groupid},include: [
    {
      model: user,
      required: false,
    }
  ]})
  .then(result =>{
    res.status(200).json({data:result , message:"successful" , Address:req.user})
  })
  .catch(err =>{
    res.status(500).json({message:"failed"})
  })
}

exports.deleteUser = (req,res)=>{
  const groupid = req.params.id;
  const userId = req.body.userid;
  console.log("gROUPiD DEKTEHSJ",groupid,userId)
  userGroup.destroy({where:{groupChatId:groupid , userId:userId}})
  .then(result =>{
    res.status(200).json({message:"deleted"})
  })
  .catch(err =>{
    res.status(500).json({message:"failed"})
  })
}

exports.MakeAdmin = (req,res)=>{
  const groupid = req.params.id;
  const userId = req.body.userid;
  
  userGroup.update(  {isAdmin:true} , {where:{groupChatId:groupid , userId:userId}})
  .then(result =>{
    res.status(200).json({message:"made Admin"})
  })
  .catch(err =>{
    res.status(500).json({message:"failed"})
  })
}

exports.RemoveAdmin = (req,res)=>{
  const groupid = req.params.id;
  const userId = req.body.userid;
  
  userGroup.update(  {isAdmin:false} , {where:{groupChatId:groupid , userId:userId}})
  .then(result =>{
    res.status(200).json({message:"REmove Admin"})
  })
  .catch(err =>{
    res.status(500).json({message:"failed"})
  })
}