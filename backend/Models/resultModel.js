import mongoose from "mongoose";

const resultSchema = new mongoose.Schema({
    attendedBy : {type:String,required:true},
    authorId : {type:String,required:true},
    total : {type:Number,required:true},
    stepPoints : {type:[Number],required:true},
    correctAnswer : {type:[Number],required:true},
    exactAnswer : {type:[Number],required:true},
    questionId:{type:String,required:true}
});

const resultModel = mongoose.models.result || mongoose.model("result",resultSchema);

export default resultModel;