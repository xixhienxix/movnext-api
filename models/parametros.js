const mongoose = require('mongoose');

const postSchemaParametros = mongoose.Schema({
    _id:{type:String},
    auditoria:{type:String},
    checkOut:{type:String},
    checkIn:{type:String},
    divisa:{type:String},
    ish:{type:String},
    iva:{type:String},
    noShow:{type:String},
    zona:{type:String},
    codigoZona:{type:String},
    id:{type:String},
    hotel:{type:String}

},{ collection: 'Parametros'});


module.exports=mongoose.model('Parametros',postSchemaParametros);