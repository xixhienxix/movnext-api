const Detalles_Huesped = require('../models/huesped_details')

exports.getDetails = (req,res)=>{
    var nombreHotel = req.body.hotel.replace(/\s/g, '_');

    Detalles_Huesped.findOne({hotel:nombreHotel}).sort({created_at: 1}).exec(function(err, detalles) {
        res.status(200).send(detalles)
        });
}

exports.getDetailsById = (req,res)=>{
    var nombreHotel = req.body.hotel.replace(/\s/g, '_');

    Detalles_Huesped.findOne({ID_Socio:req.params.folio, hotel:nombreHotel}).exec(function(err, detalles) {
        if(detalles){
            res.status(200).send(detalles._doc)
        }
        else {res.status(200)}
        });
}

exports.postDetails = (req,res)=>{

    Detalles_Huesped.updateOne({ID_Socio : req.body.ID_Socio, hotel:nombreHotel}, 
        {$set: {  ID_Socio:req.body.ID_Socio,  
            Nombre : req.body.Nombre,
            email : req.body.email, telefono : req.body.telefono,
            tipoHuesped : req.body.tipoHuesped, fechaNacimiento:req.body.fechaNacimiento,
            fechaNacimiento:req.body.fechaNacimiento, trabajaEn:req.body.trabajaEn,
            tipoDeID:req.body.tipoDeID, numeroDeID:req.body.numeroDeID,
            direccion:req.body.direccion,pais:req.body.pais,
            ciudad:req.body.ciudad,codigoPostal:req.body.codigoPostal,
            lenguaje:req.body.lenguaje,notas:req.body.notas}}, {upsert: true},

function(err, doc) {
if (err) 
{
return res.send(500, {error: err});
}
return  res.status(200).json({msg: "Modificacion de Huesped realizada con Exito"})//res.send('Succesfully saved.');
});

}