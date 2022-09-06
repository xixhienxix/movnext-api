const mongoose = require('mongoose');

const postSchemaHabitacion = mongoose.Schema({

  Codigo: {type : String},
  Numero: {type : String},
  Descripcion: {type : String},
  Estatus: {type : Number},
  Camas:{type:Number},
  Personas:{type:Number},
  Personas_Extra:{type:Number},
  Tarifa:{type:Number},
  Tipo:{type:String},
  Vista:{type:String},
  Amenidades:{type:Array},
  Tipos_Camas:{type:Array},
  Inventario:{type:Number},
  Orden:{type:Number},

  // Codigo:req.body.habitacion.Codigo,
  // Numero:req.body.habitacion.Numero[i].nombreHabs,
  // Descripcion:req.body.habitacion.Descripcion,
  // Tipo:req.body.habitacion.Tipo,
  // Personas:req.body.habitacion.Personas,
  // Personas_Extra:req.body.habitacion.Personas_Extra,
  // Vista:req.body.habitacion.Vista,
  // Camas:conteoCamas,
  // Tarifa:0,
  // checkbox:false,
  // Amenidades:req.body.habitacion.Amenidades,
  // Tipos_Camas:req.body.habitacion.Camas}
},{ collection: 'Habitaciones'});


module.exports=mongoose.model('Habitacion',postSchemaHabitacion);
