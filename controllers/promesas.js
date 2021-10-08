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
        console.log(result)
      res.status(200).json({
        message: "Promesa deleted!",
      });
    });
}

    

exports.promesaPago = async (req,res,next)=>{

    let pago =  {
      Folio:req.body.folio,
      Fecha:req.body.fecha,
      Cantidad:req.body.cantidad
    }
  
    Promesa.create(pago, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
  
  
  }