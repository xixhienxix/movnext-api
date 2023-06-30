const Tarifas = require('../models/tarifas')
const {DateTime} = require("luxon");
var ObjectId = require('mongodb').ObjectID;

exports.getTarifas = (req,res) =>{

    Tarifas.find(this).then((tarifas) => {
        // console.log(huesped)
        res.status(200).send(tarifas)
        });  
}

exports.getTarifaRack = (req,res) =>{

  Tarifas.find({Tarifa:'Tarifa Estandar'}).then((tarifas) => {
      res.status(200).send(tarifas)
      });  
}

exports.postTarifas=(req,res)=>{
let estado=true
  if(req.body.tarifa.Estado=='Activa'){estado=true}
  if(req.body.tarifa.Estado=='Inactiva'){estado=false}

    Tarifas.findOneAndUpdate({Tarifa:req.body.tarifa.Tarifa,Habitacion:req.body.tarifa.Habitacion}, {
      Tarifa:req.body.tarifa.Tarifa,
      Habitacion:req.body.tarifa.Habitacion,
      Llegada:req.body.tarifa.Llegada,
      Salida:req.body.tarifa.Salida,
      Plan:req.body.tarifa.Plan,
      Politicas:req.body.tarifa.Politicas,
      EstanciaMinima:parseInt(req.body.tarifa.EstanciaMinima),
      EstanciaMaxima:parseInt(req.body.tarifa.EstanciaMaxima),
      TarifaRack:parseInt(req.body.tarifa.TarifaRack),
      TarifaxPersona:req.body.tarifa.TarifaxPersona,
      Estado:estado,
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
  let estado=true
  if(req.body.tarifa.Estado=='Activa'){estado=true}
  if(req.body.tarifa.Estado=='Inactiva'){estado=false}

    Tarifas.findOneAndUpdate({Tarifa:req.body.tarifa.Tarifa,Habitacion:req.body.tarifa.Habitacion}, {
      Tarifa:req.body.tarifa.Tarifa,
      Habitacion:req.body.tarifa.Habitacion,
      Llegada:req.body.tarifa.Llegada,
      Salida:req.body.tarifa.Salida,
      Plan:req.body.tarifa.Plan,
      Politicas:req.body.tarifa.Politicas,
      EstanciaMinima:parseInt(req.body.tarifa.EstanciaMinima),
      EstanciaMaxima:parseInt(req.body.tarifa.EstanciaMaxima),
      TarifaRack:parseInt(req.body.tarifa.TarifaRack),
      TarifaxPersona:req.body.tarifa.TarifaxPersona,
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
  let estado=true
  if(req.body.tarifa.Estado=='Activa'){estado=true}
  if(req.body.tarifa.Estado=='Inactiva'){estado=false}
  
  Tarifas.deleteOne({Tarifa:req.body.tarifa.Tarifa,Habitacion:req.body.tarifa.Habitacion}, 
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

  try {
    Tarifas.deleteOne( { Tarifa :req.body.tarifa.Tarifa}, 
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
          
