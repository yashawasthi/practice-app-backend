const mongoose =require("mongoose");
const postSchema=new mongoose.Schema(
    {
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        }
    }
);

const post=mongoose.model("Post",postSchema);

module.exports = post;