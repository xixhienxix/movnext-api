const Adicional = require('../models/adicional')
const mongoose = require('mongoose');
var url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/'

function mongooseConnection(hotel) {
        return new Promise((resolve, reject) => {
                const db = mongoose.connect(url + hotel, { useNewUrlParser: true }).then(() => {
                        resolve(true);
                })
                        .catch(err => reject(err));
        })
}

exports.getAdicional = async (req, res) => {
        if (req.query.hotel != 'undefined') {
                const conn = await mongooseConnection(req.query.hotel)
                if (conn) {
                    const query = Adicional.find(this)
        
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