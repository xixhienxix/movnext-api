const Ama = require('../models/ama.js')
const mongoose = require('mongoose');
var url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/Master'


exports.getEstatus = async (req,res) =>
{

            const query = Ama.find(this)
            query.exec((err,result)=>{
                if(err){
                    res.status(200).send(err)
                }else {
                    res.status(200).send(result)
                }
            })
        
    
}

exports.getEstatusByID=(req,res)=>{
    Ama.find({_id:req.params.cuarto},(error,result)=>{
        if(error){
            console.log(error)
            res.status(500).send(error)

        }
        if(result){
            console.log(result)
        }
    })
}