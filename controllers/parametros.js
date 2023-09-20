const Parametros = require('../models/parametros')
const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/';

function mongooseConnection(hotel) {
    return new Promise((resolve, reject) => {
      const db = mongoose.createConnection(url + hotel, { useNewUrlParser: true }).then((conn) => {
        resolve(conn);
      })
        .catch(err => reject(err));
    })
  }

exports.getParametros = async (req, res) => {

    if (req.query.hotel != 'undefined') {

            const conn = await mongooseConnection(req.query.hotel)

            if(conn){
                const query = Parametros.find(this)

                query.exec().then(
                    (result) => {
                        res.status(200).send(result)
                    }).then(
                        ()=>{
                        })
                    .catch((err) => {
                        res.json(err);
                    });
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