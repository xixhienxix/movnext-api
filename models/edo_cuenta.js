const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

    Folio:{type:String},
    Fecha:{type:Date},
    Referencia:{type:String},
    Descripcion:{type:String},
    Forma_de_Pago:{type:String},
    Cantidad:{type:Number},
    Cargo:{type:Number},
    Abono:{type:Number},
    Total:{type:Number},
    Estatus:{type:String}

},{collection:'Edo_Cuenta'})

module.exports=mongoose.model('Edo_Cuenta',postSchema);

