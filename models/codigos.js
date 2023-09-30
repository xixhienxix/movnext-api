const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    _id:{type:String},
    Descripcion:{type:String},
    Tipo:{type:String},
    Precio:{type:Number},
    hotel:{type:String}
    
},{collection:'Codigos'})

module.exports = mongoose.model('Codigos',postSchema)