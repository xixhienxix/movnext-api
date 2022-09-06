
const Ama = require('../models/ama.js')

exports.getEstatus = (req,res) =>
{

    Ama.find(this).then((ama) => {
        // console.log(huesped)
        res.status(200).send(ama)
        });


        
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