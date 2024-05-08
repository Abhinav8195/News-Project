const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const catSchema = new Schema({
    category:{
       type:String,
       require:true
    },
    checkbox:{
        type:Boolean,
    }

});
module.exports= mongoose.model('category',catSchema)