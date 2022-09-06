const mongoose = require('mongoose');

const postSchemaDivisas = mongoose.Schema({
    _id:{type:String},
    auditoria:{type:String},
    checkOut:{type:String},
    divisa:{type:String},
    ish:{type:String},
    iva:{type:String},
    noShow:{type:String},
    zona:{type:String},
    codigoZona:{type:String},
    id:{type:String},

},{ collection: 'Parametros'});


module.exports=mongoose.model('Parametros',postSchemaDivisas);