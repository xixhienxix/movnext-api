const mongoose =  require('mongoose')

const promesaSchema = mongoose.Schema({

    Tarifa:{type:String},
    Habitacion:{type:Array},
    Llegada:{type:String},
    Salida:{type:String},
    Plan:{type:String},
    Politicas:{type:String},
    EstanciaMinima:{type:Number},
    EstanciaMaxima:{type:Number},
    TarifaRack:{type:Number},
    Tarifa1Persona:{type:Number},
    Tarifa2Persona:{type:Number},
    Tarifa3Persona:{type:Number},
    Tarifa4Persona:{type:Number},
    Estado:{type:Boolean},
    Dias:{type:Array}

  },{ collection: 'Tarifas'});
  module.exports=mongoose.model('Tarifas',promesaSchema);
  