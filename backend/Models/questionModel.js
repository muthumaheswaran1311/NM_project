import mongoose, { mongo } from "mongoose";

const questionSchema = new mongoose.Schema({
    userId : {type:String,required:true},
    quizname:{type:String,required:true},
    questionname:{type:[String],required:true},
    options:{type:[Array],required:true},
    correctanswer:{type:[Number],required:true}

})

const questionModel = mongoose.models.question || mongoose.model("question",questionSchema);

export default questionModel;