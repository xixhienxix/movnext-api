const express = require ('express')
const Adicional = require('../models/adicional')

exports.getAdicional = (req,res) =>{

        Adicional.find(this).then((adicional) => {
        res.status(200).send(adicional)
        });
      
}