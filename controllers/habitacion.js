const express = require('express');
const Habitacion = require('../models/habitacion');
const Huespedes = require('../models/huesped');
const Disponibilidad = require('../models/disponibilidad')



exports.postEstatusHabitacion = (req,res,next) => {
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

      const query = Habitacion.findOneAndUpdate({Cuarto:req.params.id,hotel:nombreHotel})
      .exec((err, db_res)=>
      {
        if (err) {
          throw err;
        }
        else {
      }
      }).then((estatus)=>{
        res.status(201).json({
          message:'Pre-Asignacion Realizada'
        });
      });
}

exports.actualizaUrlImagen = (req,res) => {
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

const codigoCuarto = req.body.fileUploadName.split('.')[0]
        try {
          Habitacion.updateOne({Codigo:codigoCuarto,hotel:nombreHotel},{$set:{URL:req.body.downloadURL}},{ upsert: true }).then(result => {
            res.status(200).json({
              message: "data Updated",
            });
          });
            }
          catch (e){
            res.status(200).json({
              message: "Failed to Save Url",
            });
             print(e);
          }
}

exports.deleteHabitacion = (req,res)=>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  var numHab
  
  Habitacion.find({_id: req.params._id,hotel:nombreHotel})
  .then(result=>{
    if(result.hasOwnProperty(Numero)){
      numHab = result[0].Numero
    }
  });

  Habitacion.deleteOne({_id: req.params._id, hotel:nombreHotel
  }).then(result => {
    Disponibilidad.deleteMany({Habitacion: numHab,hotel:nombreHotel}).then(resultDispo=>{
      res.status(200).json({
        message: "Habitación eliminada!",
      });
    })
  });
}

exports.buscarHabitacion = (req,res)=>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  Huespedes.find({habitacion:req.body.habitacion.Codigo,numeroCuarto: req.body.habitacion.Numero,hotel:nombreHotel})
  .then(result => {
    res.status(200).send(result);
  });
}

exports.nuevaHabitacion = (req,res,next) => {
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  if(req.body.editar){
    Habitacion.findOneAndUpdate({_id:req.body.habitacion._id},{
      Codigo:req.body.habitacion.Codigo,
      Numero:req.body.habitacion.Numero,
      Descripcion:req.body.habitacion.Descripcion,
      Tipo:req.body.habitacion.Tipo,
      Adultos:req.body.habitacion.Adultos,
      Ninos:req.body.habitacion.Ninos,
      Vista:req.body.habitacion.Vista,
      Camas:req.body.habitacion.Camas,
      Tarifa:0,
      Inventario:req.body.habitacion.Inventario,
      checkbox:false,
      Orden:req.body.habitacion.Orden,
      Tarifa:req.body.habitacion.Tarifa,
      Amenidades:req.body.habitacion.Amenidades,
      Tipos_Camas:req.body.habitacion.Tipos_Camas, hotel:nombreHotel}, function(err, result) {
      if (err) {
        res.send(err);
        return
      } else {
          res.status(200).json({
            message:'Habitaciones Dadas de Alta'
          });
        
      }
    });
  }
  else {
    for(let i=0; i<req.body.habitacion.Inventario; i++){
      let numero
  
  
        if(req.body.habitacion.Numero[i].nombreHabs==''){
          numero=req.body.habitacion.Codigo + '_'+i
        }else numero = req.body.habitacion.Numero[i].nombreHabs
  
        Habitacion.create({
          Codigo:req.body.habitacion.Codigo,
          Numero:numero,
          Descripcion:req.body.habitacion.Descripcion,
          Tipo:req.body.habitacion.Tipo,
          Adultos:req.body.habitacion.Adultos,
          Ninos:req.body.habitacion.Ninos,
          Vista:req.body.habitacion.Vista,
          Camas:req.body.habitacion.Camas,
          Tarifa:0,
          Inventario:req.body.habitacion.Inventario,
          checkbox:false,
          Orden:req.body.habitacion.Orden,
          Tarifa:req.body.habitacion.Tarifa,
          Amenidades:req.body.habitacion.Amenidades,
          Tipos_Camas:req.body.habitacion.Tipos_Camas, hotel:nombreHotel}, function(err, result) {
          if (err) {
            res.send(err);
            return
          } else {
            if(i==(req.body.habitacion.Inventario-1)){
              res.status(200).json({
                message:'Habitaciones Dadas de Alta'
              });
            }
          }
        });
      
  
  
    }
  }
}

exports.agregarInventario = (req,res,next) => {

  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  for(let i=0; i<req.body.habitacion.Inventario; i++){
    let numero

    if(req.body.habitacion.Numero[i].nombreHabs==''){
      numero=req.body.habitacion.Codigo + '_'+(req.body.inventario+i)
    }else numero = req.body.habitacion.Numero[i].nombreHabs

      Habitacion.create({
        Codigo:req.body.habitacion.Codigo,
        Numero:numero,
        Descripcion:req.body.habitacion.Descripcion,
        Tipo:req.body.habitacion.Tipo,
        Adultos:req.body.habitacion.Adultos,
        Ninos:req.body.habitacion.Ninos,
        Vista:req.body.habitacion.Vista,
        Camas:req.body.habitacion.Camas,
        Tarifa:0,
        Inventario:req.body.habitacion.Inventario,
        checkbox:false,
        Orden:req.body.habitacion.Orden,
        Tarifa:req.body.habitacion.Tarifa,
        Amenidades:req.body.habitacion.Amenidades,
        Tipos_Camas:req.body.habitacion.Tipos_Camas,hotel:nombreHotel}, function(err, result) {
        if (err) {
          res.send(err);
          return
        } else {
          if(i==(req.body.habitacion.Inventario-1)){
            res.status(200).json({
              message:'Habitaciones Dadas de Alta'
            });
          }
        }
      });
  }

  
}


//getInfoHabitaciones

exports.getHabitacion = (req,res,next) =>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  Habitacion.find({hotel:nombreHotel}).then((habitacion) => {
  res.status(200).send(habitacion)
  });
  
};

exports.getAll = (req,res,next) =>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  if(req.query.hotel!='undefined'){
    
        Habitacion.find({hotel:nombreHotel}).then((habitacion) => {
          res.status(200).send(habitacion)
          });
   
    };
  };


//Tipos de Cuarto
  exports.getCodigoHabitacion = (req,res,next) =>{
    var nombreHotel = req.query.hotel.replace(/\s/g, '_');

    Habitacion.find({hotel:nombreHotel}).distinct("Codigo").then((habitacion) => {
    res.status(200).send(habitacion)
    });
    };


  exports.getHabitacionbyId = (req,res,next) =>{
    var nombreHotel = req.query.hotel.replace(/\s/g, '_');

    const query = Habitacion.find({ Codigo:{$regex: req.params.codigo + '.*', $options: 'i',hotel:nombreHotel},Estatus:1});
    // const query = Habitacion.find( {$text: { $search: "\""+req.params.codigo+"\"" }, $options: 'i',Estatus:1});

    query.then((doc)=> {
      res.status(200).send(doc)
    });
}

exports.getHabitacionbyNumber = async (req,res,next) =>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  const query =await Habitacion.find({ Numero:req.params.numero,hotel:nombreHotel});
  // const query = Habitacion.find( {$text: { $search: "\""+req.params.codigo+"\"" }, $options: 'i',Estatus:1});
  try {
          res.json(await Habitacion.find({ Numero:req.params.numero}));
      }
      catch (err) {
          res.send(err);
      }
  // query.then((doc)=> {
  //   res.status(200).send(doc)
  // });
}

exports.getInfoHabitaciones = (req,res,next) =>{
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  const query = Habitacion.find({ Numero:req.query.numero,Codigo:req.query.tipo,hotel:nombreHotel});
  query.then((doc)=> {
    res.status(200).send(doc)
  });
}
