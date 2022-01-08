const mongoose = require('mongoose')


const postSchema = mongoose.Schema({
    // id:{type:String},
    username:{type:String},
    password:{type:String},
    nombre:{type:String},
    email:{type:String},
    terminos:{type:Boolean},
    rol:{type:Number}
}, {collection:'usuarios'})

// Duplicate the ID field.
// postSchema.virtual('id').get(function(){
//     return this._id.toHexString();
//   });
  
//   postSchema.set('toJSON', {
//     virtuals: true
//   });

  
module.exports= mongoose.model('usuarios',postSchema);