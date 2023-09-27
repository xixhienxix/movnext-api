const express = require('express');
const Bloqueo = require('../models/bloqueo');
const Disponibilidad = require('../models/disponibilidad');
const mongoose = require('mongoose');
const {DateTime} = require("luxon");


exports.getBloqueos = (req,res,next) =>{
  var nombreHotel = req.body.hotel.replace(/\s/g, '_');

    Bloqueo.find({hotel:nombreHotel})
    .then((bloqueos) => {
      res.status(200).send(bloqueos)
    }).catch((err)=>{
      res.status(200).send(err)
    });

  };


  exports.getBloqueosbyId = (req,res,next) =>{

    var nombreHotel = req.body.hotel.replace(/\s/g, '_');
    var id = req.params.id;

    Bloqueo.findById(id)
        .lean().exec()
        .then(
          (result)=>{
            res.status(200).send(result)
        }).catch((err)=>{
          res.status(200).send(err)
        })
}


exports.deleteBloqueo = (req,res,next) =>{

  const bloqueoId = req.params.id;

    Bloqueo.deleteOne({
      _id: req.params.id
    }).then(result => {
      res.status(200).json({
        message: "Bloqueo deleted!",
        bloqueo:result
      });
    }).catch(
      (err)=>{
        res.status(200).send(err)
    });

}


exports.actualizaBloqueos = (req,res,next) =>{

  Bloqueo.updateOne({ _id: req.body._id },
    {
      $set:
      {
        fueraDeServicio:req.body.fueraDeServicio,
        sinSalidas:req.body.sinSalidas,
        sinLlegadas:req.body.sinLlegadas,
        Comentarios:req.body.Comentarios
      }
    }, (err, request) =>
    {
      if (err) {
        res.status(401).json({
          message: err
        });
      }
  else{

      var respuesta = actualizaDisponibilidad(req.body.Desde,
        req.body.Hasta,
        req.body.Habitacion,
        req.body.Cuarto,
        req.body.sinLlegadas,
        req.body.sinSalidas,
        req.body.fueraDeServicio,
        nombreHotel);

        res.status(200).json({
          respuesta
        });

        }
    }
  )}


exports.postBloqueos = async (req,res,next)=>{


  actualizaDisponibilidad(req.body.Desde,
    req.body.Hasta,
    req.body.Habitacion,
    req.body.Cuarto,
    req.body.sinLlegadas,
    req.body.sinSalidas,
    req.body.fueraDeServicio,
    nombreHotel,
    0);

  var id = mongoose.Types.ObjectId();

  const post = new Bloqueo({
    _id:id,
    Habitacion:req.body.Habitacion,
    Cuarto:req.body.Cuarto,
    Desde:req.body.Desde,
    Hasta:req.body.Hasta,
    sinLlegadas:req.body.sinLlegadas,
    sinSalidas:req.body.sinSalidas,
    fueraDeServicio:req.body.fueraDeServicio,
    Comentarios:req.body.Comentarios,

  });


  var saved = post.save(
    (err, request) => {
    if (err) {
      res.status(401).json({
        message: err
      });
    }
// Add else
else{

      res.status(200).json({
        request
      });

}

});
}


exports.liberaBloqueos = async (req,res,next)=>{

  var nombreHotel = req.body.hotel.replace(/\s/g, '_');

  let liberaEstatus=1
  actualizaDisponibilidad(req.body.Desde,
    req.body.Hasta,
    req.body.Habitacion,
    req.body.Cuarto,
    req.body.sinLlegadas,
    req.body.sinSalidas,
    req.body.fueraDeServicio,
    nombreHotel,
    liberaEstatus);

}



function actualizaDisponibilidad(desde,hasta,habitacion,numero,sinLlegadas,sinSalidas,fueraDeServicio,nombreHotel,liberaEstatus)
{
  //Estatus:0=No Disponible (Ni Llegadas ni Salidas)
  //Estatus:1=Disponible
  //Estatus:2=No Llegadas
  //Estatus:3=No Salidas
  //Estatus:4=Fuera de Servicio
  const diaLlegada = desde.split("/")[0]
  const mesLlegada = desde.split("/")[1]
  const anoLlegada = desde.split("/")[2]
  const diaSalida = hasta.split("/")[0]
  const mesSalida = hasta.split("/")[1]
  const anoSalida = hasta.split("/")[2]

  // let toDate =   new Date(Date.UTC(anoSalida, mesSalida, diaSalida));
  // let fromDate = new Date(Date.UTC(anoLlegada, mesLlegada, diaLlegada));

  let fromDate = DateTime.fromObject({day:desde.split('/')[0],month:desde.split('/')[1],year:desde.split('/')[2]});
  let toDate = DateTime.fromObject({day:hasta.split('/')[0],month:hasta.split('/')[1],year:hasta.split('/')[2]});
  
  let diasDif = toDate.diff(fromDate, ["days"])
  let dias
  if(diasDif.days<1){dias=1}else {dias=diasDif.days}

  for(let a=0; a <=dias;a++)
  {
    for(let i=0;i<habitacion.length;i++)
    {
      for(let k=0; k<numero.length;k++)
      {
        var query = { Cuarto: habitacion[i],Habitacion:numero[k],Dia:fromDate.day,Mes:fromDate.month,Ano:fromDate.year, hotel:nombreHotel };


        let estatus;
        if(sinLlegadas&&!sinSalidas)
        {
          estatus=2
        }else if(sinSalidas&&!sinLlegadas)
        {
          estatus=3
        }else if(sinSalidas&&sinLlegadas)
        {
          estatus=4
        }else if(fueraDeServicio)
        {
          estatus=4
        }else if(!sinSalidas&&!sinLlegadas&&!fueraDeServicio)
        {
          estatus=liberaEstatus
        }

        Disponibilidad.updateOne(query, { Estatus: estatus })
        .exec((err, db_res)=>
         {
           if (err) {
            return err.message;
           }
           else {
            return (db_res);
         }
         });

      }
    }
    fromDate = fromDate.plus({ days: 1 })
  }

}
