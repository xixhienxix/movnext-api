const Ama = require('../models/ama.js')
const mongoose = require('mongoose');
var url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/Master'


function mongooseConnection(hotel) {
    return new Promise((resolve, reject) => {
            const db = mongoose.connect(url + hotel, { useNewUrlParser: true }).then(() => {
                    resolve(true);
            })
                    .catch(err => reject(err));
    })
}

exports.getEstatus = async (req,res) =>
{
    if (req.query.hotel != 'undefined') {
        const conn = await mongooseConnection(req.query.hotel)
        if (conn) {
            const query = Ama.find(this)
            query.exec((err,result)=>{
                if(err){
                    res.status(200).send(err)
                }else {
                    res.status(200).send(ama)
                }
                mongoose.connection.close();
            })
        }
    } 
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