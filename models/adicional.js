const mongoose = require('mongoose');

const postSchemaAdicional = mongoose.Schema({
  _id:{type:String},
 Descripcion:{type:String},
 Adicional:{type:Number}

},{ collection: 'Servicios_Adicionales'});


module.exports=mongoose.model('Adicional',postSchemaAdicional);
