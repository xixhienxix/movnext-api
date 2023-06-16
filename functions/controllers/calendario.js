
const express = require('express');
const Habitacion = require('../models/habitacion');

  exports.getHabitaciones = (req,res,next) =>{
    Habitacion.find(this).distinct("Codigo").then((habitacion) => {
    res.status(200).send(habitacion)
    });
    };