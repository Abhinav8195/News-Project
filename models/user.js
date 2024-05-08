const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    title:{
       type:String,
       require:true
    },
    image:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    category:{
       type:String,
       require:true
    },
    tags:{
        type:[String],
        require:true
    },
    status: { 
        type: String, 
        default: 'published' 
    } ,

    timestamp: {
        type: Date,
        default: Date.now  
    }
});
module.exports= mongoose.model('news',userSchema)