import resultModel from "../Models/resultModel.js";
import userModel from "../Models/userModel.js";


const results = async(req,res) => {
    const {authorId,total,steppoints,correctAnswer,exactAnswer,questionId} = req.body;
    const userSet = await userModel.findById(req.userId);
    const username = userSet.username;
    try{
        const result = new resultModel({
            authorId:authorId,
            attendedBy:username,
            total:total,
            stepPoints:steppoints,
            correctAnswer:correctAnswer,
            exactAnswer:exactAnswer,
            questionId:questionId
        })
        await result.save();
        res.json({success:true,message:"Result Sent"});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }

}

const showResults = async(req,res) => {
    try{
        const userSet = await userModel.findById(req.userId);
        const username = userSet.username;
        const resultData = await resultModel.find({attendedBy:username});
        res.json({success:true,resultData});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }

}

const showResponse = async(req,res) => {
    try{
        const userSet = await userModel.findById(req.userId);
        const username = userSet.username;
        const resultData = await resultModel.find({authorId:username});
        res.json({success:true,resultData});
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }

}

export {results,showResults,showResponse} ;