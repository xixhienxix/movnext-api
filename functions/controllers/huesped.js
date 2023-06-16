const express = require('express');
const Huesped = require('../models/huesped');
const Historico = require('../models/historico');
const Disponibilidad = require('../models/disponibilidad');
const Foliador = require('../models/folios')
const Estatus = require('../models/estatus');
const huesped = require('../models/huesped');
const Edo_Cuenta = require('../models/edo_cuenta')
const {DateTime} = require('luxon')
const Parametros = require('../models/parametros')

exports.getHuesped = (req,res,next) =>{
  let huespeds=[]

  Parametros.find(this).then((param) => {
    // console.log(huesped)
    let today = DateTime.now().setZone(param.zona)

    Huesped.find(this).then(
      async (huesped) => {
        for(let i=0;i<huesped.length;i++)
        {
          let numeroCuarto = huesped[i].numeroCuarto
          let habitacion = huesped[i].habitacion
  
          const query = Disponibilidad.find({ Dia: today.day, Mes: today.month, Ano: today.year, Habitacion: numeroCuarto, Cuarto:habitacion});
          let estatus_Ama_De_Llaves
          
          await query.then((doc)=> {
            let estatus_Ama_De_Llaves1
            for(let i=0;i<doc.length;i++)
              {
                let dispo =doc[i]._doc
                estatus_Ama_De_Llaves1 = dispo.Estatus_Ama_De_Llaves
              }
  
              estatus_Ama_De_Llaves=estatus_Ama_De_Llaves1
        });
  
        let temp = {
          _id:huesped[i]._id,
          folio:huesped[i].folio,
          adultos:huesped[i].adultos,
          ninos:huesped[i].ninos,
          adultos:huesped[i].adultos,
          nombre:huesped[i].nombre,
          estatus:huesped[i].estatus,
          llegada:huesped[i].llegada,
          salida:huesped[i].salida,
          noches:huesped[i].noches,
          tarifa:huesped[i].tarifa,
          porPagar:huesped[i].porPagar,
          pendiente:huesped[i].pendiente,
          origen:huesped[i].origen,
          habitacion:huesped[i].habitacion,
          telefono:huesped[i].telefono,
          email:huesped[i].email,
          motivo:huesped[i].motivo,
          fechaNacimiento:huesped[i].fechaNacimiento,
          trabajaEn:huesped[i].trabajaEn,
          tipoID:huesped[i].tipoID,
          numeroID:huesped[i].numeroID,
          direccion:huesped[i].direccion,
          pais:huesped[i].pais,
          ciudad:huesped[i].ciudad,
          codigoPostal:huesped[i].codigoPostal,
          numeroCuarto:huesped[i].numeroCuarto,
          lenguaje:huesped[i].lenguaje,
          numeroCuarto:huesped[i].numeroCuarto,
          creada:huesped[i].creada,
          tipoHuesped:huesped[i].tipoHuesped,
          notas:huesped[i].notas,
          vip:huesped[i].vip,
          ID_Socio:huesped[i].ID_Socio,
          estatus_Ama_De_Llaves:estatus_Ama_De_Llaves,
        }
        huespeds.push(temp) 
        }
      
      res.status(200).send(huespeds)
      });
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
  
    var query = {llegada: req.body.llegada,salida:req.body.salida,habitacion:req.body.habitacion,numeroCuarto:req.body.numeroCuarto};

    let notas;

    if(req.body.notas==null){
      notas=''
    }else {notas=req.body.notas}

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
      tipoHuesped:req.body.tipoHuesped,
      notas:notas,
      ID_Socio:req.body.ID_Socio,
      estatus_Ama_De_Llaves:'LIMPIA'
      }, {upsert: true}, function(err, doc) {
        if (err)
        {
          return res.send(500, {error: err});
        }else
        {
          /*Mueve la Disponibilidad*/
          let llegada = req.body.llegada
          let salida = req.body.salida
        
           let llegadaDateTime = DateTime.fromObject({day:llegada.split('/')[0],month:llegada.split('/')[1],year:llegada.split('/')[2]});
           let SalidaDateTime = DateTime.fromObject({day:salida.split('/')[0],month:salida.split('/')[1],year:salida.split('/')[2]});
          
          let diaDif=SalidaDateTime.diff(llegadaDateTime, ["days"])
        
          for (let i=0;i<=(diaDif.days+1);i++)
          {
            if(req.body.estatus!="Reserva Temporal")
            {
              let estatusAma
        
              if(req.body.estatus!="Huesped en Casa"){estatusAma='LIMPIA'}else {estatusAma='SUCIA'}
        
              var query = { Cuarto: req.body.habitacion,Habitacion:req.body.numeroCuarto,Dia:llegadaDateTime.day,Mes:llegadaDateTime.month,Ano:llegadaDateTime.year };
              Disponibilidad.updateOne(query, { Estatus: 0, Estatus_Ama_De_Llaves:estatusAma, Folio_Huesped: req.body.folio})
              .exec((err, db_res)=>
               {
                 if (err) {
                   throw err;
                 }
                 else {
               }
               });
            }
            llegadaDateTime=llegadaDateTime.plus({days:1})
        
          }
        
        //FOLIADOR UPDATE

        var updateFolio = Estatus.findOne({estatus:req.body.estatus}).then((estatus) => {

          const query = Foliador.findOneAndUpdate({Letra:'S'},{ $inc: { Folio: 1} },{new:true},

            ).exec((err, db_res)=>
            {
              if (err) {
                throw err;
              }
              else {
            }
            });

          if(estatus._doc.id==1)
          {
            const query = Foliador.findOneAndUpdate({Letra:'W'},{ $inc: { Folio: 1} },{new:true},

            ).exec((err, db_res)=>
            {
              if (err) {
                throw err;
              }
              else {
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
            }
            });
          }
          else
          {
            console.log("Estatus no valido Foliador no Actualizado",req.body.estatus)
          }

          });


            let pago = {
              Folio:req.body.folio,
              Fecha:new Date,
              Fecha_Cancelado:new Date,
              Referencia:'',
              Descripcion:'Alojamiento',
              Forma_de_Pago:'',
              Cantidad:req.body.noches,
              Cargo:req.body.pendiente,
              Abono:0,
              Total:req.body.pendiente,
              Estatus:'Activo',
              Autorizo:''

            }
          
        
            Edo_Cuenta.create(pago, function(err, result) {
              if (err) {
                res.send(err.message);
              } else {
                console.log('Insercion de Cuenta Exitosa',result);
                // res.send(result);
              }
            });
          

          

          return  res.status(200).json({msg: "Succesfully saved"})//res.send('Succesfully saved.');
        }
    });


  }

exports.actualizaHuesped = async (req,res,next)=>{

        Huesped.updateOne({folio : req.body.huesped.folio}, 
                            {$set: {  estatus:req.body.huesped.estatus,
                                      noches:req.body.huesped.noches,  
                                      numeroCuarto : req.body.huesped.numeroCuarto,
                                      llegada : req.body.huesped.llegada, salida : req.body.huesped.salida,
                                      habitacion : req.body.huesped.habitacion, tarifa:req.body.huesped.tarifa,
                                      pendiente:req.body.huesped.pendiente, porPagar:req.body.huesped.porPagar,
                                      tipoHuesped:req.body.huesped.tipoHuesped, nombre:req.body.huesped.nombre,
                                      email:req.body.huesped.email,telefono:req.body.huesped.telefono,
                                      notas:req.body.huesped.notas,ID_Socio:req.body.huesped.ID_Socio}},
          function(err, doc) 
          {
            if (err) 
            {
              return res.send(500, {error: err});
            }
            else{

              actualizaDisponibilidad(req.body.huesped.llegada, req.body.huesped.salida, req.body.huesped.habitacion, req.body.huesped.numeroCuarto)

              return  res.status(200).json({msg: "Modificacion de Huesped realizada con Exito"})
            }
           
          });


}

exports.actualizaEstatusHuesped = async (req,res,next)=>{

  Huesped.updateOne({folio : req.body.folio}, {$set: { llegada : req.body.llegada,salida : req.body.salida, tarifa : req.body.tarifa,numeroCuarto : req.body.numeroCuarto,habitacion : req.body.habitacion,notas:req.body.notas,estatus:req.body.estatus}},
    function(err, doc) {
      if (err) return res.send(500, {error: err});
      return  res.status(200).json({msg: "Succesfully saved"})//res.send('Succesfully saved.');
  });

}
// new Date("2011-09-24T00:00:00".replace(/-/g, '\/').replace(/T.+/, ''));
// => Sat Sep 24 2011 00:00:00 GMT-0700 (MST) - CORRECT DATE.

exports.actualizaHuespedModifica = async (req,res,next)=>{
 
  const diaLlegada = parseInt(req.body.llegada.split("/")[0])
  const mesLlegada = parseInt(req.body.llegada.split("/")[1])
  const anoLlegada = parseInt(req.body.llegada.split("/")[2])
  const diaSalida = parseInt(req.body.salida.split("/")[0])
  const mesSalida = parseInt(req.body.salida.split("/")[1])
  const anoSalida = parseInt(req.body.salida.split("/")[2])
        

  let stringfromDate = mesLlegada+'-'+diaLlegada+'-'+anoLlegada
  let stringtoDate = mesSalida+'-'+diaSalida+'-'+anoSalida

  var toDate =   new Date(stringtoDate)
  var fromDate = new Date(stringfromDate)

  var results = new Array();
  var errors = new Array();

  for  (fromDate; fromDate <= toDate; fromDate.setUTCDate(fromDate.getUTCDate()+1))
  {
    var stringDate =fromDate.toISOString().split('T')[0]
    var ano = stringDate.split('-')[0]
    var mes = stringDate.split('-')[1]
    var dia = stringDate.split('-')[2]

        Disponibilidad.updateOne({Dia:dia,
                                  Mes:mes,
                                  Ano:ano,
                                  Habitacion:req.body.numeroCuarto,
                                  Cuarto:req.body.habitacion}, { $set: { Estatus: 1 } }, 
                                  
          function(err, result) {
          if (err) 
          {
           console.log(err)
           errors.push(err)
          }
          else 
          {
            // res.status(200).send(result)
            results.push(result)

          }
          // res.status(200)
        })
  }

res.status(200).json({errors:errors,result:results})

}


function actualizaDisponibilidad(desde,hasta,habitacion,numero)
{
  const diaLlegada = desde.split("/")[0]
  const mesLlegada = desde.split("/")[1]
  const anoLlegada = desde.split("/")[2]
  const diaSalida = hasta.split("/")[0]
  const mesSalida = hasta.split("/")[1]
  const anoSalida = hasta.split("/")[2]

  let stringfromDate = anoLlegada+'-'+mesLlegada+'-'+diaLlegada
  let stringtoDate = anoSalida+'-'+mesSalida+'-'+diaSalida

  var toDate =   new Date(stringtoDate)
  var fromDate = new Date(stringfromDate)


  for (;fromDate < toDate; fromDate.setUTCDate(fromDate.getUTCDate()+1))
  {
      var stringDate =fromDate.toISOString().split('T')[0]
      var ano = stringDate.split('-')[0]
      var mes = stringDate.split('-')[1]
      var dia = stringDate.split('-')[2]

      var query = { Cuarto: habitacion,Habitacion:numero,Dia:dia,Mes:mes,Ano:ano };
      
      Disponibilidad.updateOne(query, { Estatus: 0 },function(err, result) {
        if (err) 
        {
/*           res.status(500);
 */        }
        else 
        {
          console.log(result)
        }
        // res.status(200)
      })
    
  }

}


exports.deleteHuesped = (req,res)=>{

  Huesped.deleteOne({_id: req.params._id
  }).then(result => {
    res.status(200).json({
      message: "Huesped deleted!",
    });
  });
}
 



