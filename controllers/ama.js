const Ama = require('../models/ama.js')
const mongoose = require('mongoose');
var url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/Master'


exports.getEstatus = async (req,res) =>
{
    var nombreHotel = req.query.hotel.replace(/\s/g, '_');

            const query = Ama.find({hotel:nombreHotel})
            query.exec((err,result)=>{
                if(err){
                    res.status(200).send(err)
                }else {
                    res.status(200).send(result)
                }
            })
        
    
}

exports.getEstatusByID=(req,res)=>{

    var nombreHotel = req.query.hotel.replace(/\s/g, '_');

    Ama.find({_id:req.params.cuarto, hotel:nombreHotel},(error,result)=>{
        if(error){
            console.log(error)
            res.status(500).send(error)

        }
        if(result){
            console.log(result)
        }
    })
}