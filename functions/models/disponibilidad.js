const mongoose = require('mongoose');

const postSchemaDisponibilidad = mongoose.Schema({

  Cuarto: {type : String},
  Habitacion: {type : String},
  Estatus: {type : Number},
  Dia:{type:Number},
  Mes:{type:Number},
  Ano:{type:Number},
  Estatus_Ama_De_Llaves:{type:String},
  Folio_Huesped:{type:Number},
  Fecha:{type:String}

},{ collection: 'Disponibilidad'});


module.exports=mongoose.model('Disponibilidad',postSchemaDisponibilidad);

