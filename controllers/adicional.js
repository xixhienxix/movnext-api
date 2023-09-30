const Adicional = require('../models/adicional')
const mongoose = require('mongoose');

exports.getAdicional = async (req, res) => {

    var nombreHotel = req.query.hotel.replace(/\s/g, '_');

                    const query = Adicional.find({hotel:nombreHotel})
        
                    query.exec().then(
                        (result) => {
                            res.status(200).send(result)
                        })
                        .catch((err) => {
                            res.json(err);
                        });
                
      
}