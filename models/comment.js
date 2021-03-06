var mongoose        = require("mongoose"),
    commentSchema   = new mongoose.Schema({
        text: String,
        createdAt: {type: Date, default: Date.now},
        author: {
            id:{
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            username: String
        },
        created: {type: Date, default: Date}
    });
    
module.exports = mongoose.model("Comment", commentSchema);
