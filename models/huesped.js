const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

  _id: {type : String},
  folio:{type:Number},
  adultos: {type : Number},
  ninos: {type : Number},
  nombre: {type:String,require:true},
  estatus: {type:String}, // Huesped en Casa = 1 | Reserva Sin Pagar = 2 | Reserva Confirmada = 3 | Hizo Checkout = 4 | Uso Interno = 5 | Bloqueo = 6 | Reserva Temporal = 7
  llegada: {type:String},
  salida: {type:String},
  noches: {type:Number},
  tarifa:{type:String},
  porPagar: {type:Number},
  pendiente: {type:Number},
  origen: {type:String},
  habitacion: {type:String},
  telefono: {type:String},
  email: {type:String},
  motivo: {type:String},
  fechaNacimiento:{type:String},
  trabajaEn:{type:String},
  tipoID: {type : String},
  numeroID: {type : String},
  direccion: {type : String},
  pais: {type : String},
  ciudad: {type : String},
  codigoPostal: {type : String},
  lenguaje: {type : String},
  numeroCuarto: {type:String},
  creada:{type:String},
  tipoHuesped:{type:String},
  notas:{type:String},
  vip: {type : String},
  ID_Socio:{type:Number},
  estatus_Ama_De_Llaves: {type : String},
  hotel:{type:String}

}

);

// Duplicate the ID field.
// postSchema.virtual('id').get(function(){
//   return this._id.toHexString();
// });

// postSchema.set('toJSON', {
//   virtuals: true
// });


module.exports=mongoose.model('Huesped',postSchema);
