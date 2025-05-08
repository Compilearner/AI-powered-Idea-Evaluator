import mongoose from "mongoose";

const feedSchema = new mongoose.Schema({
    main : {type: String,  required : true},
    suggestion : {type:String, default:""},
}, {timestamps:true});

const Feed = mongoose.model('Feed', feedSchema);

export default Feed;