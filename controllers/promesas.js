const Promesa = require('../models/promesa')

exports.getPromesa = (req,res) =>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

    Promesa.find({ Folio: req.params.folio, hotel:nombreHotel },(err,result)=>{
        if(err)
        {res.status(500).send(err)}
        else
        {res.status(200).send(result)}

    })

} 
exports.deletePromesa = (req,res)=>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

    Promesa.deleteOne({_id: req.params._id,hotel:nombreHotel
    }).then(result => {
      res.status(200).json({
        message: "Promesa deleted!",
      });
    });
}

    

exports.promesaPago = async (req,res,next)=>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

    let pago =  {
      Folio:req.body.folio,
      Fecha:req.body.fecha,
      Cantidad:req.body.cantidad,
      Estatus:req.body.estatus,
      Aplicado:false,
      hotel:nombreHotel
    }
  
    Promesa.create(pago, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  
  
  }

  
exports.updatePromesa = (req,res) =>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  const _id = req.body.id



  Promesa.findByIdAndUpdate({_id,hotel:nombreHotel},{"Aplicado": true,Estatus:'Pago Hecho'}, function(err, result){
    if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }

})
}

exports.updatePromesaEstatus = (req,res) =>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  const _id = req.body.id

  Promesa.findByIdAndUpdate({_id,hotel:nombreHotel},{Estatus:req.body.estatus}, function(err, result){
    if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }

})

} 