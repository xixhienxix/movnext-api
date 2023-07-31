const mongoose = require('mongoose');

const postSchemaAdicional = mongoose.Schema({
    Descripcion:{type:String},
    Color:{type:String},
},{ collection: 'Ama_De_Llaves'});


module.exports=mongoose.model('Ama_De_Llaves',postSchemaAdicional);