const mongoose = require('mongoose');

const postSchemaHabitacion = mongoose.Schema({

  Codigo: {type : String},
  Numero: {type : String},
  Descripcion: {type : String},
  Estatus: {type : Number},
  Camas:{type:Number},
  Adultos:{type:Number},
  Ninos:{type:Number},
  Tarifa:{type:Number},
  Tipo:{type:String},
  Vista:{type:String},
  Amenidades:{type:Array},
  Tipos_Camas:{type:Array},
  Inventario:{type:Number},
  Orden:{type:Number},
  URL:{type:String},
  hotel:{type:String}

},{ collection: 'Habitaciones'});


module.exports=mongoose.model('Habitacion',postSchemaHabitacion);
