import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema({
description:{
    type: String,
    required : true
},

userId : {
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required: true
}

},{timestamps: true});

ideaSchema.index({ userId: 1, description: 1 }, { unique: true });


const Idea = mongoose.model("Idea", ideaSchema);
export default Idea;