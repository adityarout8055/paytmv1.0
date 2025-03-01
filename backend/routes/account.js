const Account = require("../db").Account;
const express =require("express");
const { authMiddleware } = require("../middleware");
const mongoose = require("mongoose");

const router = express.Router();

router.get("/balance",authMiddleware,async(req,res)=>{
var userId = req.query.userId;
if(!userId){
    userId = req.userId;
}
const account = await Account.findOne({userId});
if(!account){
    return res.status(404).json({
        message:"Account not found"
    })
}
res.status(200).json({
    balance:account.balance
})
})


router.post("/transfer",authMiddleware,async(req,res)=>{
    const {amount,to} = req.body;
    const session = await mongoose.startSession();

    session.startTransaction();
    const account = await Account.findOne({
        userId:req.userId
    }).session(session);

    if(!account || account.balance<amount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Insufficient balance"
        })
    }

    const toAccount = await Account.findOne({
        userId:to
    })
    if(!toAccount){
        await session.abortTransaction();
        return res.status(400).json({
            message:"Invalid recipient"
        })
    }

    await Account.updateOne({
        userId:req.userId
    },{
        $inc:{balance:-amount}
    })
    await Account.updateOne({
        userId:to
    },{
        $inc:{balance:amount}
    })
    await session.commitTransaction();
    res.status(200).json({
        message:"Transfer successful"
    })
})

module.exports= router;
