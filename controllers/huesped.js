const express = require('express');
const Huesped = require('../models/huesped');
const Historico = require('../models/historico');
const Disponibilidad = require('../models/disponibilidad');
const Foliador = require('../models/folios')
const Estatus = require('../models/estatus');
const huesped = require('../models/huesped');



exports.getHuesped = (req,res,next) =>{
  Huesped.find(this).then((huesped) => {
  res.status(200).send(huesped)
  });
  };

  exports.getHuespedHistorico = (req,res,next) =>{
    Historico.find(this).then((historico) => {
    res.status(200).send(historico)
    });
    };


  exports.getHuespedbyId = (req,res,next) =>{

    const query = Huesped.findOne({ folio: req.params.id });

    query.then((doc)=> {
      res.status(200).send(doc)
    });

}

exports.postHuesped = async (req,res,next)=>{

  const diaLlegada = req.body.llegada.split("/")[0]
  const mesLlegada = req.body.llegada.split("/")[1]
  const anoLlegada = req.body.llegada.split("/")[2]
  const diaSalida = req.body.salida.split("/")[0]
  const mesSalida = req.body.salida.split("/")[1]
  const anoSalida = req.body.salida.split("/")[2]

  let toDate =   new Date(Date.UTC(anoSalida, mesSalida, diaSalida));
  let fromDate = new Date(Date.UTC(anoLlegada, mesLlegada, diaLlegada))


  for (;fromDate < toDate; fromDate.setUTCDate(fromDate.getUTCDate()+1))
  {
    if(req.body.estatus!="Reserva Temporal")
    {
      var query = { Cuarto: req.body.habitacion,Habitacion:req.body.numeroCuarto,Dia:fromDate.getUTCDate(),Mes:fromDate.getMonth(),Ano:fromDate.getFullYear() };
      Disponibilidad.updateOne(query, { Estatus: 0 })
      .exec((err, db_res)=>
       {
         if (err) {
           throw err;
         }
         else {
           console.log("Updated Disponibilidad: ",db_res);
       }
       });
    }
  }

    var query = {llegada: req.body.llegada,salida:req.body.salida,habitacion:req.body.habitacion,numeroCuarto:req.body.numeroCuarto};

    Huesped.findOneAndUpdate(query, {
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
      tipoHuesped:req.body.tipoHuesped
      }, {upsert: true}, function(err, doc) {
        if (err)
        {
          return res.send(500, {error: err});
        }else
        {
        
        //FOLIADOR UPDATE

        var updateFolio = Estatus.findOne({estatus:req.body.estatus}).then((estatus) => {

          if(estatus._doc.id==1)
          {
            const query = Foliador.findOneAndUpdate({Letra:'W'},{ $inc: { Folio: 1} },{new:true},

            ).exec((err, db_res)=>
            {
              if (err) {
                throw err;
              }
              else {
                console.log("db_res",db_res);
            }
            });
          } else

          if(estatus._doc.id==6 || estatus._doc.id==5 || estatus._doc.id==7 || estatus._doc.id==2)
          {
            const query = Foliador.findOneAndUpdate({Letra:'R'},{ $inc: { Folio: 1} },{new:true},
            ).exec((err, db_res)=>
            {
              if (err) {
                throw err;
              }
              else {
                console.log("db_res",db_res);
            }
            });
          }
          else
          {
            console.log("Estatus no valido Foliador no Actualizado",req.body.estatus)
          }

          });

          return  res.status(200).json({msg: "Succesfully saved"})//res.send('Succesfully saved.');
        }
    });


  }

exports.actualizaHuesped = async (req,res,next)=>{

        Huesped.updateOne({folio : req.body.folio}, 
                            {$set: { numeroCuarto : req.body.numeroCuarto,
                                      llegada : req.body.llegada, salida : req.body.salida,
                                      habitacion : req.body.habitacion, tarifa:req.body.tarifa,
                                      pendiente:req.body.pendiente, porPagar:req.body.porPagar}},
          function(err, doc) {
            if (err) 
            {
              return res.send(500, {error: err});
            }
            actualizaDisponibilidad(req.body.llegada,req.body.salida,req.body.habitacion,req.body.numeroCuarto)
            // var date1 = new Date(fromDate);
            // var date2 = new Date(toDate);
            // To calculate the time difference of two dates
            // var Difference_In_Time = date2.getTime() - date1.getTime();
              
            // To calculate the no. of days between two dates
            // var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
          
            // for (;fromDate < toDate; fromDate.setUTCDate(fromDate.getUTCDate()+1))
            // for(fromDate; fromDate<toDate; fromDate.setUTCDate(fromDate.getUTCDate()+1))
            // {
            //   const fromDateDia = parseInt(fromDate.getUTCDate())
            //   const fromDateMes = parseInt(fromDate.getUTCMonth())
            //   const fromDateAno = parseInt(fromDate.getUTCFullYear())

              

            //     var query = { Cuarto: req.body.habitacion,Habitacion:req.body.numeroCuarto,Dia:fromDateDia,Mes:fromDateMes,Ano:fromDateAno };
            //     Disponibilidad.updateOne(query, { Estatus: 0 })
            //     .exec((err, db_res)=>
            //      {
            //        if (err) {
            //          throw err;
            //        }
            //        else {
            //          console.log("Updated Disponibilidad: ",db_res);
            //      }
            //      });
              
            // }

            return  res.status(200).json({msg: "Modificacion de Huesped realizada con Exito"})//res.send('Succesfully saved.');
        });


}

exports.actualizaEstatusHuesped = async (req,res,next)=>{

  Huesped.updateOne({folio : req.body.folio}, {$set: { llegada : req.body.llegada,salida : req.body.salida, tarifa : req.body.tarifa,numeroCuarto : req.body.numeroCuarto,habitacion : req.body.habitacion}},
    function(err, doc) {
      if (err) return res.send(500, {error: err});
      return  res.status(200).json({msg: "Succesfully saved"})//res.send('Succesfully saved.');
  });

}




function actualizaDisponibilidad(desde,hasta,habitacion,numero)
{

  const diaLlegada = parseInt(desde.split("/")[0])
  const mesLlegada = parseInt(desde.split("/")[1])
  const anoLlegada = parseInt(desde.split("/")[2])
  const diaSalida = parseInt(hasta.split("/")[0])
  const mesSalida = parseInt(hasta.split("/")[1])
  const anoSalida = parseInt(hasta.split("/")[2])

  // let toDate =   new Date(Date.UTC(anoSalida, mesSalida, diaSalida))
  // let fromDate = new Date(Date.UTC(anoLlegada, mesLlegada, diaLlegada))
  let fromDate =   new Date(Date.UTC(anoLlegada,mesLlegada-1,diaLlegada))
  let toDate = new Date(Date.UTC(anoSalida,mesSalida-1,diaSalida))

  for  (fromDate; fromDate <= toDate; fromDate.setUTCDate(fromDate.getUTCDate()+1))
  {
        var query = { Cuarto: habitacion,Habitacion:numero,Dia:fromDate.getUTCDate(),Mes:fromDate.getUTCMonth(),Ano:fromDate.getUTCFullYear() };

        Disponibilidad.updateOne(query, { Estatus: 0 })
        .exec((err, db_res)=>
         {
           if (err) {
             console.log("Error Al Actualizar Disponibilidad :",err.message)
            return err.message;
           }
           else {
             console.log("Updated Disponibilidad: ",db_res);
            return (db_res);
         }
         });


  }

}


