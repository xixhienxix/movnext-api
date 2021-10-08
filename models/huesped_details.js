const mongoose = require('mongoose')

const detailsSchema = mongoose.Schema({
    ID_Socio:{type:Number},
    Nombre:{type:String},
    email:{type:String},
    telefono:{type:String},
    tipoHuesped:{type:String},
    fechaNacimiento:{type:String},
    trabajaEn:{type:String},
    tipoDeID:{type:String},
    numeroDeID:{type:String},
    direccion:{type:String},
    pais:{type:String},
    ciudad:{type:String},
    codigoPostal:{type:String},
    lenguaje:{type:String},
    notas:{type:String}
},{collection:'Detalles_Huesped'});

module.exports=mongoose.model('Detalles_Huesped',detailsSchema);
