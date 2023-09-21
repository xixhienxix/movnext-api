const Parametros = require('../models/parametros')
const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/';

exports.getParametros = async (req, res) => {
    if (req.query.hotel != 'undefined') {
        let parametrosQueryResult
        const conn = await mongoose.connect(url+req.query.hotel, { promiseLibrary: require('bluebird')})
            .then(async()=>{
                    parametrosQueryResult = await Parametros.find(this)
                    .then(
                        (res)=>{
                            return res
                        }).catch((err)=>{
                            console.log({queryParametrosResult:err})
                            return err
                        })
                }).catch(
                    (err)=>{
                        console.log({conn:err})
                        res.status(200).send("Failed to connect to the Database: "+req.query.hotel)
                }).finally(
                    ()=>{
                        res.status(200).send(parametrosQueryResult)
                    })           
    }
}

exports.postParametros = (req, res) => {

    try {
        Parametros.findOneAndUpdate(
            { id: req.body.id },
            {
                $set:
                {
                    auditoria: req.body.auditoria,
                    ish: req.body.ish,
                    iva: req.body.iva,
                    zona: req.body.zona,
                    codigoZona: req.body.codigoZona,
                    checkOut: req.body.checkOut,
                    checkIn: req.body.checkIn,
                    noShow: req.body.noShow,
                    divisa: req.body.divisa
                }
            }, { upsert: true, returnNewDocument: true }, (error, results) => {
                if (error) {
                    res.status(500).send('Error al actualizar parametros')
                }
                if (results) {
                    res.status(200).send(results)
                }
            }
        );
    }
    catch (e) {
        res.status(500).send('Error al actualizar parametros :' + e)
    }




}