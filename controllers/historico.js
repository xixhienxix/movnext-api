const express = require('express');
const Historico = require ('../models/historico')

exports.postHistorico = async (req,res) =>
{
  console.log(req.body)
    var query = {llegada: req.body.llegada,salida:req.body.salida,habitacion:req.body.habitacion,numeroCuarto:req.body.numeroCuarto};

if(req.body.estatus=='Reserva Sin Pago'){
    Historico.findOneAndUpdate(query, {
      folio:req.body.folio,
      nombre:req.body.nombre,
      adultos:req.body.adultos,
      ninos:req.body.ninos,
      estatus:req.body.estatus,
      llegada:req.body.llegada,
      salida:req.body.salida,
      noches:req.body.noches,
      habitacion:req.body.habitacion,
      tarifa:req.body.tarifa,
      pendiente:req.body.pendiente,
      porPagar:req.body.porPagar,
      telefono:req.body.telefono,
      email:req.body.email,
      motivo:req.body.motivo,
      numeroCuarto:req.body.numeroCuarto,
      origen:req.body.origen,
      creada:req.body.creada,
      tipoHuesped:req.body.tipoHuesped,
      estatus_historico:'reserva'
      }, {upsert: true}, function(err, doc) {
        if (err)
        {
          return res.send(500, {error: err});
        }else
        {
          return  res.status(200).json({msg: "Huesped Guardado en Historico"})//res.send('Succesfully saved.');
        }
    });
}
else
{
    Historico.findOneAndUpdate(query, {
        folio:req.body.folio,
        nombre:req.body.nombre,
        adultos:req.body.adultos,
        ninos:req.body.ninos,
        estatus:req.body.estatus,
        llegada:req.body.llegada,
        salida:req.body.salida,
        noches:req.body.noches,
        habitacion:req.body.habitacion,
        tarifa:req.body.tarifa,
        pendiente:req.body.pendiente,
        porPagar:req.body.porPagar,
        telefono:req.body.telefono,
        email:req.body.email,
        motivo:req.body.motivo,
        numeroCuarto:req.body.numeroCuarto,
        origen:req.body.origen,
        creada:req.body.creada,
        tipoHuesped:req.body.tipoHuesped,
        estatus_historico:'huesped'
        }, {upsert: true}, function(err, doc) {
          if (err)
          {
            return res.send(500, {error: err});
          }else
          {
            return  res.status(200).json({msg: "Huesped Guardado en Historico"})//res.send('Succesfully saved.');
          }
      }); 
}


}