const express = require('express');
const Estatus = require('../models/estatus');
const huesped = require('../models/huesped');


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

  let estatus = req.body.estatus
  let query

  if(estatus==1)
  { query = huesped.updateOne({ folio:req.body.folio },{$set:{estatus:"Huesped en Casa"}});}
  else 
  if(estatus==2)
  { query = huesped.updateOne({ folio:req.body.folio },{$set:{estatus:"Reserva Sin Pago"}});}
  else 
  if(estatus==3)
  { query = huesped.updateOne({ folio:req.body.folio },{$set:{estatus:"Reserva Confirmada"}});}
  else  
  if(estatus==4)
  { query = huesped.updateOne({ folio:req.body.folio },{$set:{estatus:"Check-Out"}});}
  else
  if(estatus==5)
  { query = huesped.updateOne({ folio:req.body.folio },{$set:{estatus:"Uso Interno"}});}
  else
  if(estatus==6)
  { query = huesped.updateOne({ folio:req.body.folio },{$set:{estatus:"Bloqueo / Sin Llegadas"}});}
  else
  if(estatus==7)
  { query = huesped.updateOne({ folio:req.body.folio },{$set:{estatus:"Reserva Temporal"}});}
  else 
  if(estatus==8)
  { query = huesped.updateOne({ folio:req.body.folio },{$set:{estatus:"Esperando Deposito"}});}
  else 
  if(estatus==9)
  { query = huesped.updateOne({ folio:req.body.folio },{$set:{estatus:"Deposito Realizado"}});}
  else 
  if(estatus==10)
  { query = huesped.updateOne({ folio:req.body.folio },{$set:{estatus:"Totalmente Pagada"}});}
  
  query.then((doc)=> {
    res.status(200).send(doc)
  });

}
