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
    let errorLogs = []
    mongoose.connect('mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/Master', 
    { useNewUrlParser: true, promiseLibrary: require('bluebird')})
    .then(async () => {

            let user = {
                nombre : req.body.fullname,
                email : req.body.email,
                username : req.body.username,
                password : req.body.password,
                terminos : req.body.terminos,
                rol:2,
                hotel:req.body.hotel
            }

            var nombreHotel = req.body.hotel.replace(/\s/g, '_');
            var db_url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/'
            db_url = db_url+nombreHotel

            const username = req.body.username

            let userExist = await usuarios.find({username : username})
                .then((docs) => {
                    if (docs.length){
                        return true
                        
                    }else{
                        return false
                    }
                }) 
                .catch((err) => {
                    errorLogs.push({userExistQuery:err})
                    console.log(errorLogs)
                    res.status(200).send(err)
                })
        
            if(userExist==false){
                let createdUser = await usuarios.create(user)
                            .then((res) => {
                                if(res){
                                    return true
                                }else{
                                    return false
                                }
                            }).catch((err) => {
                                errorLogs.push({createdUser:err})
                                console.log(errorLogs)
                                res.status(200).send(err)
                            }).finally(
                                ()=>{
                                    mongoose.connection.close()
                            });
                if(createdUser==true){
                    //New Conection to Hotel to Crerate DBs
                    const newHotelConn = await mongoose.connect(db_url, { promiseLibrary: require('bluebird')})
                    .then(async() => {
                        const amaQueryResult = await Ama.insertMany(ama_defaults.ama_llaves_defaults)
                            .then((res) => {
                                console.log('Amma de Llaves Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({amaQueryResult:err})
                                console.log(err)
                                return false
                            })
                        const codigoQueryResult = await Codigos.insertMany(codigos_defaults.codigos_default)
                            .then((res) => {
                                console.log('Codigos Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({codigoQueryResult:err})
                                console.log(err)
                                return false
                            })
                        const divisasQueryResult = await Divisas.insertMany(divisas_default.divisas_defaults)
                            .then((res) => {
                                console.log('Divisas Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({divisasQueryResult:err})
                                console.log(err)
                                return false
                            })
                        const estatusQueryResult = await Estatus.insertMany(estatus_default.estatus_default)
                            .then((res) => {
                                console.log('Estatus Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({estatusQueryResult:err})
                                console.log(errorLogs)
                                return false
                            })
                        const estatusBloqueoQueryResult = await Estatus_Bloqueo.insertMany(estatus_bloqueo_default.estatus_bloqueo)
                            .then((res) => {
                                console.log('Estatus Bloqueo Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({estatusBloqueoQueryResult:err})
                                console.log(errorLogs)
                                return false
                            })
                        const foliadorQueryResult = await Foliador.insertMany(foliador_default_values.foliador_default)
                            .then((res) => {
                                console.log('Foliador Bloqueo Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({foliadorQueryResult:err})
                                console.log(errorLogs)
                                return false
                            })
                        const origenQueryResult = await Origen.insertMany(origen_default_values.origen_default_values)
                            .then((res) => {
                                console.log('Origen Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({origenQueryResult:err})
                                console.log(errorLogs)
                                return false
                            })
                        const parametrosQueryResult = await Parametros.insertMany(parametros_default_values.parametros_default_values)
                            .then((res) => {
                                console.log('Parametros Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({parametrosQueryResult:err})
                                console.log(errorLogs)
                                return false
                            })
                        const timezonesQueryResult = await TimeZones.insertMany(timezones_default_values.timezones_default_values)
                            .then((res) => {
                                console.log('Parametros Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({timezonesQueryResult:err})
                                console.log(err)
                                return false
                            })
                    })
                    .catch((err) => {
                        errorLogs.push(err)
                        console.log(errorLogs)
                        res.status(200).send(err)
                    }).finally(
                        ()=>{
                            mongoose.connection.close()
                    });
                }else{
                    res.status(409).send('No se pudo registrar su hotel intente nuevamente')
                }

            }else{
                res.status(200).send({response:'El nombre de usuario no se puede usar, especifique otro'});
            }

        })
        .catch((err) => {
            errorLogs.push(err)
            console.log(errorLogs)
            res.status(200).send(err)
        }).finally(
            ()=>{
                mongoose.connection.close()
                res.status(200).send({mensaje:"Tablas creadas correctamente"})
        });
  }