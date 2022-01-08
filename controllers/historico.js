const express = require('express');
const Historico = require ('../models/historico')

exports.postHistorico = async (req,res) =>
{
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

// exports.updateHistorico = async (req,res) =>
// {
//     var query = {llegada: req.body.huesped.llegada,
//       salida:req.body.huesped.salida,
//       habitacion:req.body.huesped.habitacion,
//       numeroCuarto:req.body.huesped.numeroCuarto};


//     Historico.findOneAndUpdate(query, {
//         folio:req.body.huesped.folio,
//         nombre:req.body.huesped.nombre,
//         adultos:req.body.huesped.adultos,
//         ninos:req.body.huesped.ninos,
//         estatus:req.body.huesped.estatus,
//         llegada:req.body.huesped.llegada,
//         salida:req.body.huesped.salida,
//         noches:req.body.huesped.noches,
//         habitacion:req.body.huesped.habitacion,
//         tarifa:req.body.huesped.tarifa,
//         pendiente:req.body.huesped.pendiente,
//         porPagar:req.body.huesped.porPagar,
//         telefono:req.body.huesped.telefono,
//         email:req.body.huesped.email,
//         motivo:req.body.huesped.motivo,
//         numeroCuarto:req.body.huesped.numeroCuarto,
//         origen:req.body.huesped.origen,
//         creada:req.body.huesped.creada,
//         tipoHuesped:req.body.huesped.tipoHuesped,
//         estatus_historico:'huesped'
//         }, {upsert: true}, function(err, doc) {
//           if (err)
//           {
//             return res.send(500, {error: err});
//           }else
//           {
//             return  res.status(200).json({msg: "Cliente Guardado en Historico"})//res.send('Succesfully saved.');
//           }
//       }); 


// }

exports.getClientes = (req,res,next) =>{
  Historico.find(this).then((cliente) => {
  res.status(200).send(cliente)
  });
  };


exports.getHuespedbyId = (req,res,next) =>{

    const query = Historico.findOne({ folio: req.params.id });

    query.then((doc)=> {
      res.status(200).send(doc)
    });

}