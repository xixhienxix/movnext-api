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
  {  
    var huesped;

    huesped.updateOne({ folio:req.body.folio },{$set:{estatus:"Check-Out"}},function(err,result){
      if(err)
      {res.status(409).send('No se pudo completar el CheckOut intente de nuevo mas tarde')}
      else
      {
        huesped.findOne({folio:req.body.folio},function(err,result){
          if (err) 
          {res.status(409).send('No se encontro al huesped')} ;
          // twiml.message(newDeal.deal)
          huesped=result
          console.log("returned from the model: ",result)

          Historico.postHistorico(huesped).then(function(err,result) {
            if(err)
              {res.status(500).send('Error al guardar en el Historico')}
            else
              {res.status(200).send('Guardado en el Historico Con Exito',result)}
          });

          return result
        });
        res.status(200).send('check out realizado con exito',result)
      }
    });

  }
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
