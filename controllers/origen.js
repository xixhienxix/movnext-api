const Origen = require('../models/origen');


exports.getOrigen = (req,res,next) =>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  Origen.find({hotel:nombreHotel}).then((doc)=>{
   res.status(200).send(doc)
 });
}

