const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const tagSchema = new Schema({
    tag:{
       type:String,
       require:true
    }
});
module.exports= mongoose.model('tag',tagSchema)