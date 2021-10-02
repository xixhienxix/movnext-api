const Codigos = require('../models/codigos.js')

exports.getCodigosDeCargo = (req,res)=>{
    Codigos.find({},(err,result)=>{
        if(err)
        {res.status(400).send(err)}
        else
        {res.status(200).send(result)}
    })
} 