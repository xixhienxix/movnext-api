const mongoose = require('mongoose');

const postSchema = mongoose.Schema({

    Folio:{type:String},
    Fecha:{type:Date},
    Fecha_Cancelado:{type:String},
    Referencia:{type:String},
    Descripcion:{type:String},
    Forma_de_Pago:{type:String},
    Cantidad:{type:Number},
    Cargo:{type:Number},
    Abono:{type:Number},
    Total:{type:Number},
    Estatus:{type:String},
    Autorizo:{type:String}

},{collection:'Edo_Cuenta'})

module.exports=mongoose.model('Edo_Cuenta',postSchema);

