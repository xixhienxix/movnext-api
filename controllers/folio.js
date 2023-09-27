const express = require('express');
const Foliador = require('../models/folios')

exports.getFoliosbyLetra = (req,res,next) =>{
  var nombreHotel = req.body.hotel.replace(/\s/g, '_');

  const query = Foliador.findOne({ Letra: req.params.letra, hotel:nombreHotel });

  query.then((doc)=> {
    res.status(200).send(doc)
  });

}

exports.updateFolio = (req,res,next) =>{
  var nombreHotel = req.body.hotel.replace(/\s/g, '_');

  if(req.body.id==1)
  {
    const query = Foliador.findOneAndUpdate({Letra:'W',hotel:nombreHotel},{ $inc: { Folio: 1} },{new:true},

    ).exec((err, db_res)=>
    {
      if (err) {
        throw err;
      }
      else {
    }
    });
  } else

  if(req.body.id==6 || req.body.id==5 || req.body.id==7 || req.body.id==2)
  {
    const query = Foliador.findOneAndUpdate({Letra:'R',hotel:nombreHotel},{ $inc: { Folio: 1} },{new:true},
    ).exec((err, db_res)=>
    {
      if (err) {
        throw err;
      }
      else {
    }
    });
  }
  else
  {
    console.log("Estatus no valido Foliador no Actualizado",req.body.estatus)
  }
}

exports.getFolios = (req,res,next) =>{
  var nombreHotel = req.body.hotel.replace(/\s/g, '_');

   Foliador.find({hotel:nombreHotel}).then((doc)=>{
    res.status(200).send(doc)
  });
}
