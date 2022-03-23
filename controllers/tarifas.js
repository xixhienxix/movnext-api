const Tarifas = require('../models/tarifas')
const {DateTime} = require("luxon");

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

          Tarifas.findOneAndUpdate({Tarifa:req.body.tarifa.Tarifa,Habitacion:{$regex : req.body.tarifa.Habitacion}}, {
            Tarifa:req.body.tarifa.Tarifa,
            Habitacion:req.body.tarifa.Habitacion,
            Llegada:req.body.tarifa.Llegada,
            Salida:req.body.tarifa.Salida,
            Plan:req.body.tarifa.Plan,
            Politicas:req.body.tarifa.Politicas,
            EstanciaMinima:parseInt(req.body.tarifa.EstanciaMinima),
            EstanciaMaxima:parseInt(req.body.tarifa.EstanciaMaxima),
            TarifaRack:parseInt(req.body.tarifa.TarifaRack),
            Tarifa1Persona:parseInt(req.body.tarifa.Tarifa1Persona),
            Tarifa2Persona:parseInt(req.body.tarifa.Tarifa2Persona),
            Tarifa3Persona:parseInt(req.body.tarifa.Tarifa3Persona),
            Tarifa4Persona:parseInt(req.body.tarifa.Tarifa4Persona),
            Estado:estado,
            Dias:req.body.tarifa.Dias
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

    Tarifas.create({
      Tarifa:req.body.tarifa.Tarifa,
      Habitacion:req.body.tarifa.Habitacion,
      Llegada:req.body.tarifa.Llegada,
      Salida:req.body.tarifa.Salida,
      Plan:req.body.tarifa.Plan,
      Politicas:req.body.tarifa.Politicas,
      EstanciaMinima:parseInt(req.body.tarifa.EstanciaMinima),
      EstanciaMaxima:parseInt(req.body.tarifa.EstanciaMaxima),
      TarifaRack:parseInt(req.body.tarifa.TarifaRack),
      Tarifa1Persona:parseInt(req.body.tarifa.Tarifa1Persona),
      Tarifa2Persona:parseInt(req.body.tarifa.Tarifa2Persona),
      Tarifa3Persona:parseInt(req.body.tarifa.Tarifa3Persona),
      Tarifa4Persona:parseInt(req.body.tarifa.Tarifa4Persona),
      Estado:estado,
      Dias:req.body.tarifa.Dias
      }, function(err, doc) {
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
if(req.body.tarifa.Habitacion.length==1){
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
}else {
  Tarifas.findOneAndUpdate({Tarifa:req.body.tarifa.Tarifa,Habitacion:{$regex : req.body.tarifa.Habitacion}}, {
    Tarifa:req.body.tarifa.Tarifa,
    Habitacion:req.body.tarifa.Habitacion,
    Llegada:req.body.tarifa.Llegada,
    Salida:req.body.tarifa.Salida,
    Plan:req.body.tarifa.Plan,
    Politicas:req.body.tarifa.Politicas,
    EstanciaMinima:parseInt(req.body.tarifa.EstanciaMinima),
    EstanciaMaxima:parseInt(req.body.tarifa.EstanciaMaxima),
    TarifaRack:parseInt(req.body.tarifa.TarifaRack),
    Tarifa1Persona:parseInt(req.body.tarifa.Tarifa1Persona),
    Tarifa2Persona:parseInt(req.body.tarifa.Tarifa2Persona),
    Tarifa3Persona:parseInt(req.body.tarifa.Tarifa3Persona),
    Tarifa4Persona:parseInt(req.body.tarifa.Tarifa4Persona),
    Estado:estado,
    Dias:req.body.tarifa.Dias
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
          
}