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

exports.create = async (req,res) => {
    var nombreHotel = req.body.hotel.replace(/\s/g, '_');

    let errorLogs = []

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

            const username = req.body.username

            let userExist = await usuarios.find({username : username})
                .then(async (docs) => {
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
                            })
                if(createdUser==true){
                    //New Conection to Hotel to Crerate DBs

                    let amaDefaultValuesWithHotelName=[]
                    for(let i=0;i<ama_defaults.ama_llaves_defaults.length;i++){
                        ama_defaults.ama_llaves_defaults[i].hotel=nombreHotel
                        amaDefaultValuesWithHotelName.push(ama_defaults.ama_llaves_defaults[i])
                    }

                        const amaQueryResult = await Ama.insertMany(amaDefaultValuesWithHotelName)
                            .then((res) => {
                                console.log('Amma de Llaves Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({amaQueryResult:err})
                                console.log(err)
                                return false
                            })

                    let codigos_defaultValuesWithHotelName=[]
                        for(let i=0;i<codigos_defaults.codigos_default.length;i++){
                            codigos_defaults.codigos_default[i].hotel=nombreHotel
                            codigos_defaultValuesWithHotelName.push(codigos_defaults.codigos_default[i])
                        }

                        const codigoQueryResult = await Codigos.insertMany(codigos_defaultValuesWithHotelName)
                            .then((res) => {
                                console.log('Codigos Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({codigoQueryResult:err})
                                console.log(err)
                                return false
                            })

                    let divisas_defaultValuesWithHotelName=[]
                        for(let i=0;i<divisas_default.divisas_defaults.length;i++){
                            divisas_default.divisas_defaults[i].hotel=nombreHotel
                            divisas_defaultValuesWithHotelName.push(divisas_default.divisas_defaults[i])
                            }

                        const divisasQueryResult = await Divisas.insertMany(divisas_defaultValuesWithHotelName)
                            .then((res) => {
                                console.log('Divisas Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({divisasQueryResult:err})
                                console.log(err)
                                return false
                            })

                            let estatus_defaultValuesWithHotelName=[]
                            for(let i=0;i<estatus_default.estatus_default.length;i++){
                                estatus_default.estatus_default[i].hotel=nombreHotel
                                estatus_defaultValuesWithHotelName.push(estatus_default.estatus_default[i])
                                }

                        const estatusQueryResult = await Estatus.insertMany(estatus_defaultValuesWithHotelName)
                            .then((res) => {
                                console.log('Estatus Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({estatusQueryResult:err})
                                console.log(errorLogs)
                                return false
                            })

                            let estatus_bloqueo_defaultValuesWithHotelName=[]
                            for(let i=0;i<estatus_bloqueo_default.estatus_bloqueo.length;i++){
                                estatus_bloqueo_default.estatus_bloqueo[i].hotel=nombreHotel
                                estatus_bloqueo_defaultValuesWithHotelName.push(estatus_bloqueo_default.estatus_bloqueo[i])
                                }

                        const estatusBloqueoQueryResult = await Estatus_Bloqueo.insertMany(estatus_bloqueo_defaultValuesWithHotelName)
                            .then((res) => {
                                console.log('Estatus Bloqueo Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({estatusBloqueoQueryResult:err})
                                console.log(errorLogs)
                                return false
                            })


                            let foliador_default_valuesValuesWithHotelName=[]
                            for(let i=0;i<foliador_default_values.foliador_default.length;i++){
                                foliador_default_values.foliador_default[i].hotel=nombreHotel
                                foliador_default_valuesValuesWithHotelName.push(foliador_default_values.foliador_default[i])
                                }

                        const foliadorQueryResult = await Foliador.insertMany(foliador_default_valuesValuesWithHotelName)
                            .then((res) => {
                                console.log('Foliador Bloqueo Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({foliadorQueryResult:err})
                                console.log(errorLogs)
                                return false
                            })


                            let origen_default_valuesValuesWithHotelName=[]
                            for(let i=0;i<origen_default_values.origen_default_values.length;i++){
                                origen_default_values.origen_default_values[i].hotel=nombreHotel
                                origen_default_valuesValuesWithHotelName.push(origen_default_values.origen_default_values[i])
                                }
                        const origenQueryResult = await Origen.insertMany(origen_default_valuesValuesWithHotelName)
                            .then((res) => {
                                console.log('Origen Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({origenQueryResult:err})
                                console.log(errorLogs)
                                return false
                            })

                            let parametros_default_valuesValuesWithHotelName=[]
                            for(let i=0;i<parametros_default_values.parametros_default_values.length;i++){
                                parametros_default_values.parametros_default_values[i].hotel=nombreHotel
                                parametros_default_valuesValuesWithHotelName.push(parametros_default_values.parametros_default_values[i])
                                }
                        const parametrosQueryResult = await Parametros.insertMany(parametros_default_valuesValuesWithHotelName)
                            .then((res) => {
                                console.log('Parametros Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({parametrosQueryResult:err})
                                console.log(errorLogs)
                                return false
                            })


                            let timezones_default_valuesValuesWithHotelName=[]
                            for(let i=0;i<timezones_default_values.timezones_default_values.length;i++){
                                timezones_default_values.timezones_default_values[i].hotel=nombreHotel
                                timezones_default_valuesValuesWithHotelName.push(timezones_default_values.timezones_default_values[i])
                                }
                        const timezonesQueryResult = await TimeZones.insertMany(timezones_default_valuesValuesWithHotelName)
                            .then((res) => {
                                console.log('Parametros Collection Creada Exitosamente')
                                return true
                            }) 
                            .catch((err) => {
                                errorLogs.push({timezonesQueryResult:err})
                                console.log(err)
                                return false
                            })
                    
                    
                }else{
                    res.status(409).send('No se pudo registrar su hotel intente nuevamente')
                }

            }else{
                res.status(200).send({response:'El nombre de usuario no se puede usar, especifique otro'});
            }
   
  }