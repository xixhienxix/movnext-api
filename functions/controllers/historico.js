const express = require('express');
const Historico = require ('../models/historico');
const huesped = require('../models/huesped');

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
      estatus_historico:'reserva',
      id_Socio:req.body.ID_Socio
      }, {upsert: true}, function(err, doc) {
        if (err)
        {
          return res.send(500, {error: err});
        }else
        {
 
          huesped.deleteOne({folio:req.body.folio}, function(err, doc) {
            if (err)
            {
              return res.status(200).json({msg:"Huesped no pudo ser borrado de la lista de huespedes"});          
            }else
            {
              return  res.status(200).json({msg: "Huesped Guardado en Historico"})//res.send('Succesfully saved.');

            }
          })

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
        estatus_historico:'huesped',
        id_Socio:req.body.ID_Socio

        }, {upsert: true}, function(err, doc) {
          if (err)
          {
            return res.send(500, {error: err});
          }else
          {
              huesped.deleteOne({folio:req.body.folio}, function(err, doc) {
              if (err)
              {
                return res.status(200).json({msg:"Huesped no pudo ser borrado de la lista de huespedes"});          
              }else
              {
                return  res.status(200).json({msg: "Huesped Guardado en Historico"})//res.send('Succesfully saved.');

              }
            })
         }
      }); 
}



}

exports.actualizaDatos=(req,res,next)=>{
  Historico.findOneAndUpdate({folio:req.body.folio}, {
    telefono:req.body.telefono,
    tipoHuesped:req.body.tipoHuesped,
    fechaNacimiento:req.body.fechaNacimiento,
    trabajaEn:req.body.trabajaEn,
    tipoDeID:req.body.tipoDeID,
    numeroDeID:req.body.numeroDeID,
    direccion:req.body.direccion,
    pais:req.body.pais,
    ciudad:req.body.ciudad,
    codigoPostal:req.body.codigoPostal,
    lenguaje:req.body.lenguaje,
    razonsocial:req.body.razonsocial,
    rfc:req.body.rfc,
    cfdi:req.body.cfdi,
    email:req.body.email
   
    }, {upsert: true}, function(err, doc) {
      if (err)
      {
        return res.send(500, {error: err});
      }else
      {
          huesped.deleteOne({folio:req.body.folio}, function(err, doc) {
          if (err)
          {
            return res.status(200).json({msg:"Huesped no pudo ser borrado de la lista de huespedes"});          
          }else
          {
            return  res.status(200).json({msg: "Huesped Guardado en Historico"})//res.send('Succesfully saved.');

          }
        })
     }
  }); 
}


exports.getClientes = (req,res,next) =>{
  Historico.find(this).then((cliente) => {
  res.status(200).send(cliente)
  });
  };

exports.getHistoricoVisitas = (req,res,next) =>{
    Historico.find({id_Socio:req.params.id}).then((cliente) => {
    res.status(200).send(cliente)
    });
    };


exports.getHuespedbyId = (req,res,next) =>{

    const query = Historico.findOne({ folio: req.params.id });

    query.then((doc)=> {
      res.status(200).send(doc)
    });

}

