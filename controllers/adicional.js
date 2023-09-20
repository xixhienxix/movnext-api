const Adicional = require('../models/adicional')
const mongoose = require('mongoose');
var url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/'


exports.getAdicional = async (req, res) => {

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
                
      
}