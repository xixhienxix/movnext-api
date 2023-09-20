const jwt = require('jsonwebtoken')
const private_key='b8b96d8661599441631edc161db8d15c'
const mongoose = require('mongoose');
//Models
const usuarios = require('../models/usuarios')
const Ama = require('../models/ama')
const Codigos = require('../models/codigos')
const Divisas = require('../models/divisas')
const Estatus = require('../models/estatus')
const Estatus_Bloqueo = require('../models/estatus_bloqueo')
const Foliador = require('../models/folios')
const Origen = require('../models/origen')
const Parametros = require('../models/parametros')
const TimeZones = require('../models/timezones')

//Defauls
const ama_defaults = require('../defaultValues/ama_llaves')
const codigos_defaults = require('../defaultValues/codigos')
const divisas_default = require('../defaultValues/divisas')
const estatus_default = require('../defaultValues/estatus')
const estatus_bloqueo_default = require('../defaultValues/estatus_bloqueo')
const foliador_default_values = require('../defaultValues/foliador')
const origen_default_values = require('../defaultValues/origen')
const parametros_default_values = require('../defaultValues/parametros')
const timezones_default_values = require('../defaultValues/timezones')

exports.create = (req,res)=>{

    mongoose.connect('mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/Master', {
                    useNewUrlParser: true,})
                              .then(() => {
                              console.log('Connected to the Database Master');
                })

    let user = {
        nombre : req.body.fullname,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        terminos : req.body.terminos,
        rol:2,
        hotel:req.body.hotel
    }

    var nombreHotel = req.body.hotel.replace(/\s/g, '');
    var db_url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/'
    db_url = db_url+nombreHotel

    //Usuario Existe?
    const username = req.body.username

    usuarios.find({username : username}, function (err, docs) {
        if (docs.length){
            res.status(200).send({response:'El nombre de usuario no se puede usar, especifique otro'});
        }else{
            usuarios.create(user, function(err, result) {
                if (err) {
                  res.send(err);
                } else {
                    if(result){
        
                        const id= result._id.toString()
        
                        jwt.sign({result},private_key,{expiresIn:'30m'},
                                (err,accessToken)=>{
                                if(err){
                                    res.status(409).send('Algo Salio mal')
                                }
                                result.accessToken=accessToken
                              })
                              
                              mongoose.connection.close()
                            //New Mongo Connection
                              mongoose
                              .connect(db_url, {
                              useNewUrlParser: true,
                              })
                              .then(() => {
                              console.log('Connected to the Database.'+req.body.hotel);
                              
                              //Collection Creation
                                Ama.insertMany(ama_defaults.ama_llaves_defaults).then((result) => {
                                    console.log('Amma de Llaves Collection Creada Exitosamente')
                                });
                                Codigos.insertMany(codigos_defaults.codigos_default).then((result) => {
                                    console.log('Codigos Collection Creada Exitosamente')
                                });
                                Divisas.insertMany(divisas_default.divisas_defaults).then((result) => {
                                    console.log('Divisas Collection Creada Exitosamente')
                                });
                                Estatus.insertMany(estatus_default.estatus_default).then((result) => {
                                    console.log('Estatus Collection Creada Exitosamente')
                                });
                                Estatus_Bloqueo.insertMany(estatus_bloqueo_default.estatus_bloqueo).then((result) => {
                                    console.log('Estatus Bloqueos Collection Creada Exitosamente')
                                });
                                Foliador.insertMany(foliador_default_values.foliador_default).then((result) => {
                                    console.log('Foliador Bloqueos Collection Creada Exitosamente')
                                });
                                Origen.insertMany(origen_default_values.origen_default_values).then((result) => {
                                    console.log('Origen Collection Creada Exitosamente')
                                });
                                Parametros.insertMany(parametros_default_values.parametros_default_values).then((result) => {
                                    console.log('Parametros Collection Creada Exitosamente')
                                });
                                TimeZones.insertMany(timezones_default_values.timezones_default_values).then((result) => {
                                    console.log('TimeZones Collection Creada Exitosamente')
                                });
                        
                              })
                              .catch(err => 
                              console.error(err));

                              res.status(200).send({mensaje:"Tablas creadas correctamente"})
        
                    }else 
                    {
                      res.status(409).send('Usuario y/o Contraseñas incorrectas')}
                    }
              });
        }   
    });

  }