const Parametros = require('../models/parametros')
var mongo = require('mongodb');


exports.getParametros = (req,res) =>
{

    Parametros.find(this).then((param) => {
        // console.log(huesped)
        res.status(200).send(param)
        });  
}

exports.postParametros = (req,res)=>{

    try {
        Parametros.findOneAndUpdate(
           { id: req.body.id},
           { $set: 
                { auditoria:req.body.auditoria,   
                ish:req.body.ish,
                iva:req.body.iva,
                zona:req.body.zona,
                codigoZona:req.body.codigoZona,
                checkOut:req.body.checkOut,
                noShow:req.body.noShow,
                divisa:req.body.divisa
                }
            },{upsert:true, returnNewDocument : true},(error,results)=>{
                if(error)
                {
                    res.status(500).send('Error al actualizar parametros')
                }
                if(results)
                {
                    res.status(200).send(results)
                }
            }
        );
        }
        catch (e){
            res.status(500).send('Error al actualizar parametros :'+e)
        }



    
}