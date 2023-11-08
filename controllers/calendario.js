
const express = require('express');
const Habitacion = require('../models/habitacion');

exports.getHabitaciones = (req, res, next) => {
  var nombreHotel = req.query.hotel.replace(/\s/g, '_');

  Habitacion.find({ hotel: nombreHotel }).distinct("Codigo")
    .then((habitacion) => {
      res.status(200).send(habitacion)
    }).catch((err)=>{
      res.status(200).send(err)
    });
};