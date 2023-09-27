const Tarifas = require('../models/tarifas')
const {DateTime} = require("luxon");
var ObjectId = require('mongodb').ObjectID;

exports.getTarifas = (req,res) =>{
  var nombreHotel = req.body.hotel.replace(/\s/g, '_');

    Tarifas.find({hotel:nombreHotel}).then((tarifas) => {
        // console.log(huesped)
        res.status(200).send(tarifas)
        });  
}

exports.getTarifaRack = (req,res) =>{
  var nombreHotel = req.body.hotel.replace(/\s/g, '_');

  Tarifas.find({Tarifa:'Tarifa Estandar',hotel:nombreHotel}).then((tarifas) => {
      res.status(200).send(tarifas)
      });  
}

exports.postTarifas=(req,res)=>{
  var nombreHotel = req.body.hotel.replace(/\s/g, '_');

let estado=true
  if(req.body.tarifa.Estado=='Activa'){estado=true}
  if(req.body.tarifa.Estado=='Inactiva'){estado=false}

    Tarifas.findOneAndUpdate({Tarifa:req.body.tarifa.Tarifa,Habitacion:req.body.tarifa.Habitacion,hotel:nombreHotel}, {
      Tarifa:req.body.tarifa.Tarifa,
      Habitacion:req.body.tarifa.Habitacion,
      Llegada:req.body.tarifa.Llegada,
      Salida:req.body.tarifa.Salida,
      Plan:req.body.tarifa.Plan,
      Politicas:req.body.tarifa.Politicas,
      EstanciaMinima:parseInt(req.body.tarifa.EstanciaMinima),
      EstanciaMaxima:parseInt(req.body.tarifa.EstanciaMaxima),
      TarifaRack:parseInt(req.body.tarifa.TarifaRack),
      TarifaXAdulto:req.body.tarifa.TarifaXAdulto,
      TarifaXNino:req.body.tarifa.TarifaXNino,
      Estado:estado,
      Adultos:req.body.tarifa.Adultos,
      Ninos:req.body.tarifa.Ninos,
      Dias:req.body.tarifa.Dias,
      Descuento: req.body.tarifa.Descuento != null ? req.body.tarifa.Descuento : 0
     }, {upsert: true}, function(err, doc) {
        if (err)
        {
          return res.status(500).send({error: err.message});
        }else
        {
          res.status(200).send(doc)
        }
       })
  
  }
    

exports.postTarifaEspecial=(req,res)=>{
  var nombreHotel = req.body.hotel.replace(/\s/g, '_');

  let estado=true
  if(req.body.tarifa.Estado=='Activa'){estado=true}
  if(req.body.tarifa.Estado=='Inactiva'){estado=false}

    Tarifas.findOneAndUpdate({Tarifa:req.body.tarifa.Tarifa,Habitacion:req.body.tarifa.Habitacion,hotel:nombreHotel}, {
      Tarifa:req.body.tarifa.Tarifa,
      Habitacion:req.body.tarifa.Habitacion,
      Llegada:req.body.tarifa.Llegada,
      Salida:req.body.tarifa.Salida,
      Plan:req.body.tarifa.Plan,
      Adultos:req.body.tarifa.Adultos,
      Ninos:req.body.tarifa.Ninos,
      Politicas:req.body.tarifa.Politicas,
      EstanciaMinima:parseInt(req.body.tarifa.EstanciaMinima),
      EstanciaMaxima:parseInt(req.body.tarifa.EstanciaMaxima),
      TarifaRack:parseInt(req.body.tarifa.TarifaRack),
      TarifaXAdulto:req.body.tarifa.TarifaXAdulto,
      TarifaXNino:req.body.tarifa.TarifaXNino,
      Estado:estado,
      Dias:req.body.tarifa.Dias,
      Descuento:req.body.tarifa.Descuento

      }, {upsert: true}, function(err, doc) {
        if (err)
        {
          return res.status(500).send({error: err.message});
        }else
        {
          res.status(200).send(doc)
        }
       })
  
  }

exports.deleteTarifaRack = (req,res) =>{
  var nombreHotel = req.body.hotel.replace(/\s/g, '_');

  let estado=true
  if(req.body.tarifa.Estado=='Activa'){estado=true}
  if(req.body.tarifa.Estado=='Inactiva'){estado=false}
  
  Tarifas.deleteOne({Tarifa:req.body.tarifa.Tarifa,Habitacion:req.body.tarifa.Habitacion,hotel:nombreHotel}, 
     function(err, doc) {
      if (err)
      {
        return res.status(500).send({error: err.message});
      }else
      {
        res.status(200).send(doc)
      }
     })

          
}

exports.deleteTarifaRackEspecial= (req,res) =>{
  var nombreHotel = req.body.hotel.replace(/\s/g, '_');

  try {
    Tarifas.deleteOne( { Tarifa :req.body.tarifa.Tarifa,hotel:nombreHotel}, 
      function(err, doc) {
       if (err)
       {
         return res.status(500).send({error: err.message});
       }else
       {
         res.status(200).send(doc)
       }
      })
    
 } catch (e) {
    print(e);
 }


}
          
