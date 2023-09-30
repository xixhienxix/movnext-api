const Parametros = require('../models/parametros')
const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/';

exports.getParametros = async (req, res) => {
    var nombreHotel = req.query.hotel.replace(/\s/g, '_');

    if (req.query.hotel != 'undefined') {
        let parametrosQueryResult
                    parametrosQueryResult = await Parametros.find({hotel:nombreHotel})
                    .then(
                        (value)=>{
                            return res.status(200).send(value)
                        }).catch((err)=>{
                            console.log({queryParametrosResult:err})
                            return res.status(200).send(err)
                        })          
    }
}

exports.postParametros = (req, res) => {
    var nombreHotel = req.query.hotel.replace(/\s/g, '_');

    try {
        Parametros.findOneAndUpdate(
            { id: req.body.id,hotel:nombreHotel },
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