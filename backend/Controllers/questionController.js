import questionModel from "../Models/questionModel.js"
import userModel from "../Models/userModel.js"

const newQuestion = async(req,res) => {
    try{
        const userId = await userModel.findOne({_id:req.userId});
        const username = await userId.username;
        const {quizname,questionname,options,correctanswer} = req.body
        const question = new questionModel({
            userId:username,
            quizname:quizname,
            questionname:questionname,
            options:options,
            correctanswer:correctanswer
        })
        await question.save()
        res.json({success:true,message:"Question saved"})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }
}

const getQuestion = async (req,res) => {
    try{
        const userId = await userModel.findOne({_id:req.userId});
        const username = await userId.username;
        const questionData = await questionModel.find({userId:username})
        res.json({success:true,questionData})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }
}

const userQuestion = async(req,res) => {
    try{
        const { userId } = req.body;  
        const userQuestion = await questionModel.find({userId})
        res.json({success:true,userQuestion})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }
}

const question = async(req,res) => {
    try{
        const {id} = req.body;
        const questionPaper = await questionModel.findById(id);
        res.json({success:true,questionPaper})
    }
    catch(err){
        console.log(err);
        res.json({success:false,message:"Error"})
    }
}

export {newQuestion,getQuestion,userQuestion,question};