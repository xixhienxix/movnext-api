const mongoose = require('mongoose')

const promesaSchema = mongoose.Schema({

    Folio:{type:Number},
    Fecha:{type:Date},
    Cantidad:{type:Number}
  },{ collection: 'Promesas_Pago'});
  module.exports=mongoose.model('Promesas_Pago',promesaSchema);
  