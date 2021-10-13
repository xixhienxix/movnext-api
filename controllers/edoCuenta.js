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
            Total:req.body.Total
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

exports.deletePago = (req,res)=>{

  Edo_Cuenta.deleteOne({_id: req.params._id
  }).then(result => {
    res.status(200).json({
      message: "PAgo deleted!",
    });
  });
}