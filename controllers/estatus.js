const express = require('express');
const Estatus = require('../models/estatus');
const huesped = require('../models/huesped');
const HistoricoModel = require ('../models/historico')
const Historico = require ('../controllers/historico')


exports.getEstatus = (req,res,next) =>{
  Estatus.find(this).then((estatus) => {
  // console.log(huesped)
  res.status(200).send(estatus)
  });
  };


  exports.getEstatusbyId = (req,res,next) =>{

    const query = Estatus.findOne({ id: req.params.id });

    query.then((doc)=> {
      res.status(200).send(doc)
    });

}


exports.updateEstatus = (req,res,next) =>{

  let estatusActualizado = req.body.estatus
  let estatusPrevio = req.body.estatus



  if(req.body.estatus==1)
  { 
    estatusActualizado ="Huesped en Casa" 
  }
  else if(req.body.estatus==2)
  { 
  estatusActualizado="Reserva Sin Pago"
  }
  else if(req.body.estatus==3)
  { 
    estatusActualizado="Reserva Confirmada"
  }
  else if(req.body.estatus==4)
  { 
    estatusActualizado="Check-Out"

    // huesped.updateOne({ folio:req.body.folio },{$set:{estatus:estatusActualizado}},function(err,result){
    //   if(err)
    //   {
    //     res.status(409).send(err)
    //   }
    //   else
    //   {
      
    //     res.status(200).send(result)
    //   }
    // });
  }
  else if(req.body.estatus==5)
  { 
    estatusActualizado="Uso Interno"
  }
  else if(req.body.estatus==6)
  { 
    estatusActualizado="Bloqueo / Sin Llegadas"
  }
  else if(req.body.estatus==7)
  { 
    estatusActualizado="Reserva Temporal"
  }
  else if(req.body.estatus==8)
  { 
    estatusActualizado="Esperando Deposito"
  }
  else if(req.body.estatus==9)
  { 
    estatusActualizado="Deposito Realizado"
  }
  else if(req.body.estatus==10)
  { 
    estatusActualizado="Totalmente Pagada"
  }
  else if(req.body.estatus==11)
  { 
    estatusActualizado="No Show"
  }
  else if(req.body.estatus==12)
  { 
    estatusActualizado="Reserva Cancelada"
  }
  if(req.body.estatus==4)
  {
    huesped.updateOne({folio:req.body.folio},{$set:{estatus:estatusActualizado,
                                                      pendiente:req.body.huesped.pendiente,
                                                      porPagar:req.body.huesped.porPagar,
                                                      noches:req.body.huesped.noches}},function(err,result)
    {
      if (err) {
        console.log("Error Al Actualizar Estado :",err.message)
        res.status(500).send(err.message)
      }
      else {
        // Historico.updateHistorico(req.body)
        console.log("Estado Actualizado: ",result);
        res.status(200).send(result);
    }
    }); 
  }else {
    huesped.updateOne({folio:req.body.folio},{$set:{estatus:estatusActualizado}},function(err,result)
    {
      if (err) {
        console.log("Error Al Actualizar Estado :",err.message)
        res.status(500).send(err.message)
      }
      else {
        console.log("Estado Actualizado: ",result);
        res.status(200).send(result);
    }
    }); 
  } 
}
  
 

