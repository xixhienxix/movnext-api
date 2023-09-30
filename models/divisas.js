const mongoose = require('mongoose');

const postSchemaDivisas = mongoose.Schema({
    _id:{type:String},
    Localidad:{type:String},
    Nombre:{type:String},
    Simbolo:{type:String},
    hotel:{type:String}
},{ collection: 'Divisas'});


module.exports=mongoose.model('Divisas',postSchemaDivisas);