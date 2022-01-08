const mongoose = require('mongoose');

const postSchemaTimeZones = mongoose.Schema({
    _id:{type:String},
    Codigo:{type:String},
    Nombre:{type:String},
    UTC:{type:String},
},{ collection: 'TimeZones'});


module.exports=mongoose.model('TimeZones',postSchemaTimeZones);