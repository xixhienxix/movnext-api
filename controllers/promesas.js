const Promesa = require('../models/promesa')

exports.getPromesa = (req,res) =>{

    Promesa.find({ Folio: req.params.folio },(err,result)=>{
        if(err)
        {res.status(500).send(err)}
        else
        {res.status(200).send(result)}

    })

} 
exports.deletePromesa = (req,res)=>{

    Promesa.deleteOne({_id: req.params._id
    }).then(result => {
      res.status(200).json({
        message: "Promesa deleted!",
      });
    });
}

    

exports.promesaPago = async (req,res,next)=>{

    let pago =  {
      Folio:req.body.folio,
      Fecha:req.body.fecha,
      Cantidad:req.body.cantidad,
      Estatus:req.body.estatus,
      Aplicado:false
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

  const _id = req.body.id



  Promesa.findByIdAndUpdate({_id},{"Aplicado": true,Estatus:req.body.estatus}, function(err, result){
    if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }

})
}

exports.updatePromesaEstatus = (req,res) =>{

  const _id = req.body.id

  Promesa.findByIdAndUpdate({_id},{Estatus:req.body.estatus}, function(err, result){
    if(err){
        res.send(err)
    }
    else{
        res.send(result)
    }

})

} 