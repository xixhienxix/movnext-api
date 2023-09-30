const mongoose = require('mongoose');

const postSchemaEstatusBloqueo = mongoose.Schema({

    Estatus: {type : Number},
    Descripcion: {type : String},
    hotel:{type:String}

},{ collection: 'Estatus_Bloqueo'});


module.exports=mongoose.model('Estatus_Bloqueo',postSchemaEstatusBloqueo);
