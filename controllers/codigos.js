const Codigos = require('../models/codigos.js')

exports.getCodigosDeCargo = (req,res)=>{
    var nombreHotel = req.query.hotel.replace(/\s/g, '_');

    Codigos.find({hotel:nombreHotel},(err,result)=>{
        if(err)
        {res.status(400).send(err)}
        else
        {res.status(200).send(result)}
    })
} 

exports.getTiposHabitaciones = (req,res)=>{
    var nombreHotel = req.query.hotel.replace(/\s/g, '_');

    Codigos.find({Tipo:"HAB",hotel:nombreHotel},(err,result)=>{
        if(err)
        {res.status(400).send(err)}
        else
        {res.status(200).send(result)}
    })
}

exports.getAmenidades = (req,res)=>{
    var nombreHotel = req.query.hotel.replace(/\s/g, '_');

    Codigos.find({Tipo:"AME",hotel:nombreHotel},(err,result)=>{
        if(err)
        {res.status(400).send(err)}
        else
        {res.status(200).send(result)}
    })
}

exports.getCamas = (req,res)=>{
    var nombreHotel = req.query.hotel.replace(/\s/g, '_');

    Codigos.find({Tipo:"CAMA",hotel:nombreHotel},(err,result)=>{
        if(err)
        {res.status(400).send(err)}
        else
        {res.status(200).send(result)}
    })
}

