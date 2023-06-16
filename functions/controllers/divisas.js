const Divisas = require('../models/divisas')

exports.getDivisas = (req,res) =>
{

    Divisas.find(this).then((zone) => {
        // console.log(huesped)
        res.status(200).send(zone)
        });  
}

exports.getDivisasByParametro = (req,res) =>
{

    Divisas.find({Nombre:req.params.divisa}).then((divisa) => {
        // console.log(huesped)
        res.status(200).send(divisa)
        });  
}