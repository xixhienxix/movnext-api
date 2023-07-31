const Parametros = require('../models/parametros')
var mongo = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/';


exports.getParametros = async (req,res) =>
{
    if(req.query.hotel!='undefined'){
        try {
            mongoose.connect(url+req.query.hotel.replace(/\s/g, ''), {useNewUrlParser: true,})
                .then(
                    () => 
                        {
                            Parametros.find(this).then((param) => {
                                res.status(200).send(param)
                                }); 
                        }
                    )
        } catch (error) {
            console.log('Error connecting to DB ::', error);
        }
    }
}

exports.postParametros = (req,res)=>{

    try {
        Parametros.findOneAndUpdate(
           { id: req.body.id},
           { $set: 
                { auditoria:req.body.auditoria,   
                ish:req.body.ish,
                iva:req.body.iva,
                zona:req.body.zona,
                codigoZona:req.body.codigoZona,
                checkOut:req.body.checkOut,
                noShow:req.body.noShow,
                divisa:req.body.divisa
                }
            },{upsert:true, returnNewDocument : true},(error,results)=>{
                if(error)
                {
                    res.status(500).send('Error al actualizar parametros')
                }
                if(results)
                {
                    res.status(200).send(results)
                }
            }
        );
        }
        catch (e){
            res.status(500).send('Error al actualizar parametros :'+e)
        }



    
}