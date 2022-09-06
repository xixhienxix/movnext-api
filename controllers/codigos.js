const Codigos = require('../models/codigos.js')

exports.getCodigosDeCargo = (req,res)=>{
    Codigos.find({},(err,result)=>{
        if(err)
        {res.status(400).send(err)}
        else
        {res.status(200).send(result)}
    })
} 

exports.getTiposHabitaciones = (req,res)=>{
    Codigos.find({Tipo:"HAB"},(err,result)=>{
        if(err)
        {res.status(400).send(err)}
        else
        {res.status(200).send(result)}
    })
}

exports.getAmenidades = (req,res)=>{
    Codigos.find({Tipo:"AME"},(err,result)=>{
        if(err)
        {res.status(400).send(err)}
        else
        {res.status(200).send(result)}
    })
}

exports.getCamas = (req,res)=>{
    Codigos.find({Tipo:"CAMA"},(err,result)=>{
        if(err)
        {res.status(400).send(err)}
        else
        {res.status(200).send(result)}
    })
}

