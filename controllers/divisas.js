const Divisas = require('../models/divisas')

exports.getDivisas = (req,res) =>
{
    var nombreHotel = req.body.hotel.replace(/\s/g, '_');

    Divisas.find({hotel:nombreHotel}).then((zone) => {
        res.status(200).send(zone)
        }).catch((err)=>{
            res.status(200).send(err)
        });  
}

exports.getDivisasByParametro = (req,res) =>
{
    var nombreHotel = req.body.hotel.replace(/\s/g, '_');

    Divisas.find({Nombre:req.params.divisa, hotel:nombreHotel}).then((divisa) => {
        res.status(200).send(divisa)
        }).catch((err)=>{
            res.status(200).send(err)
        });  ;  
}