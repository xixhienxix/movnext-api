const mongoose =  require('mongoose')

const promesaSchema = mongoose.Schema({
_id:{type:String},
    Tarifa:{type:String},
    Habitacion:{type:Array},
    Llegada:{type:String},
    Salida:{type:String},
    Plan:{type:String},
    Politicas:{type:String},
    EstanciaMinima:{type:Number},
    EstanciaMaxima:{type:Number},
    TarifaRack:{type:Number},
    TarifaXAdulto:{type:Array},
    TarifaXNino:{type:Array},
    Estado:{type:Boolean},
    Dias:{type:Array},
    Adultos:{type:Number},
    Ninos:{type:Number},
Descuento:{type:Number},
hotel:{type:String}

  },{ collection: 'Tarifas'});
  module.exports=mongoose.model('Tarifas',promesaSchema);
  