const express = require("express");
const zod = require("zod");
const {User,Account} = require("../db");
const JWT_SECRET = require("../config");
const authMiddleware = require("../middleware");

const userRouter = express.Router();

const signUpSchema = zod.object({
  username: zod.string().email(),
  firstname: zod.string(),
  lastname: zod.string(),
  password: zod.string(),
});

userRouter.post("/signup", async (req, res) => {  
    const body = req.body;
  const {success} = signUpSchema.parse(body);
  if(!success){
    return res.status(411).json({ message: "Invalid request / email already exists" });
  }
const user = User.findOne({
    username: body.username,
  });

  if(user._id){
    return res.status(400).json({ message: "User already exists" });
  }

  const newUser = await User.create({
    username: body.username,
    firstname: body.firstname,
    lastname: body.lastname,
    password: body.password,
  });
  const userId = newUser._id;

  await Account.create({
    userId,
    balance:  1 + Math.random() * 10000,
  })

  const token = jwt.sign({
    userId,
  },JWT_SECRET);

  res.status(201).json({
    token,
    message: "User created successfully",
  });
});
const signInSchema = zod.object({
  username:zod.string().email(),
  password:zod.string()
})

userRouter.post("/signin",async (req,res)=>{
  const user = req.body;
  const {success} = signInSchema.parse(user);
  if(!success){
    return res.status(400).json({
      message:"invalid username or password"
    })
  }
  const userExists = await User.findOne({
    username:user.username,
    password:user.password
  })

 if(userExists){
  const token = jwt.sign({userId:userExists._id},JWT_SECRET);
  res.json({
    token:token
  });
  return;
 }
 res.status(411).json({
  message: "Error while logging in"
})
})

const updateSchema = zod.object({
  password:zod.string().optional(),
  firstname:zod.string().optional(),
  lastname:zod.string().optional()
});



userRouter.put("/user",authMiddleware,async (req,res)=>{
const body = req.body;
const bodyParse = updateSchema.parse(body);
if(!bodyParse){
  return res.status(400).json({
    message:"invalid string"
  })
}
const updateUser = await User.updateOne(
{_id:body._id},body
);
return res.status(200).json({
  message:"updated successfully",
})
})

userRouter.get("/bulk",async (req,res)=>{
  const filter = req.query.filter || "";

  const users = await User.find({
      $or: [{
          firstName: {
              "$regex": filter
          }
      }, {
          lastName: {
              "$regex": filter
          }
      }]
  })

  res.json({
      user: users.map(user => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id
      }))
  })
})

module.exports = userRouter;
