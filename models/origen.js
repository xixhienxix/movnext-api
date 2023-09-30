const mongoose = require('mongoose')

const postSchema = mongoose.Schema({

  ID:{type:Number},
  Descripcion:{type:String},
  hotel:{type:String}

},{ collection: 'Origen'});
module.exports=mongoose.model('Origen',postSchema);
