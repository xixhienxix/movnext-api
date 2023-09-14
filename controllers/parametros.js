const Parametros = require('../models/parametros')
var mongo = require('mongodb');
const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/';

// Function to compute the product of p1 and p2
function mongooseConnection(hotel) {
    return new Promise((resolve, reject) => {
        const db = mongoose.connect(url + hotel, { useNewUrlParser: true }).then((value) => {
            resolve(value);
        })
            .catch(err => reject(err));
    })
}

exports.getParametros = async (req, res) => {
    if (req.query.hotel != 'undefined') {
        const conn = await mongooseConnection(req.query.hotel)
        if (conn) {
            const query = Parametros.find(this)

            query.exec().then(
                (result) => {
                    res.status(200).send(result)
                })
                .then(
                    () => mongoose.connection.close)
                .catch((err) => {
                    res.json(err);
                });
        } else {
            res.status(200).send(err)
        }
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