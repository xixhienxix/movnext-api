const Origen = require('../models/origen');


exports.getOrigen = (req,res,next) =>{
  Origen.find().then((doc)=>{
   res.status(200).send(doc)
    console.log("Origenes ",doc)
 });
}
