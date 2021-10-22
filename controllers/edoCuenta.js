const Edo_Cuenta = require('../models/edo_cuenta')

var mongoose = require('mongoose');

exports.agregarPago=(req,res)=>{
    
        let pago = {
            Folio: req.body.Folio,
            Fecha:new Date(),
            Referencia:req.body.Referencia,
            Descripcion:req.body.Descripcion,
            Forma_de_Pago:req.body.Forma_de_Pago,
            Cantidad:req.body.Cantidad,
            Cargo:req.body.Cargo,
            Abono:req.body.Abono,
            Total:req.body.Total,
            Estatus:req.body.Estatus
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

    Edo_Cuenta.find({Folio:req.params.id},(err,result)=>{
        if(err)
        {res.status(500).send(err)}
        else
        {res.status(200).send(result)}

    })
}

exports.updateEstatusPago = (req,res)=>{

  Edo_Cuenta.updateOne({_id: req.body._id},{$set:{Estatus:req.body.estatus}}).then(result => {
    res.status(200).json({
      message: "PAgo actualizado!",
    });
  });
}