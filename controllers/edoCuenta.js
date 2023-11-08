const Edo_Cuenta = require('../models/edo_cuenta')

var mongoose = require('mongoose');

exports.agregarPago=(req,res)=>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

        let pago = {
            Folio: req.body.Folio,
            Fecha:new Date(),
            Fecha_Cancelado:'',
            Referencia:req.body.Referencia,
            Descripcion:req.body.Descripcion,
            Forma_de_Pago:req.body.Forma_de_Pago,
            Cantidad:req.body.Cantidad,
            Cargo:req.body.Cargo,
            Abono:req.body.Abono,
            Total:req.body.Total,
            Estatus:req.body.Estatus,
            Autorizo:req.body.Autorizo,
            hotel:nombreHotel
        }
        
      
        Edo_Cuenta.create(pago, function(err, result) {
          if (err) {
            res.send(err);
          } else {
            res.send(result);
          }
        });
          
}

exports.getCuentas= (req,res)=>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

    Edo_Cuenta.find({Folio:req.params.id,hotel:nombreHotel},(err,result)=>{
        if(err)
        {res.status(500).send(err)}
        else
        {res.status(200).send(result)}

    })
}

exports.getTodasLasCuentas = (req,res)=>{

  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  Edo_Cuenta.find({hotel:nombreHotel},(err,result)=>{
    if(err)
    {res.status(500).send(err)}
    else
    {res.status(200).send(result)}

})

}

exports.updateEstatusPago = (req,res)=>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  Edo_Cuenta.updateOne({_id: req.body._id},{$set:{Estatus:req.body.estatus,Fecha_Cancelado:req.body.fechaCancelado,Autorizo:req.body.autorizo,hotel:nombreHotel}}).then(result => {
    res.status(200).json({
      message: "PAgo actualizado!",
    });
  });
}

exports.actualizaSaldo = (req,res)=>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  Edo_Cuenta.updateOne({_id: req.body._id, hotel:nombreHotel},{$set:{Cargo:req.body.monto}}).then(result => {
    res.status(200).json({
      message: "Movimiento actualizado!",
    });
  });
}