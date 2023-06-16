const express = require('express');
const Disponibilidad = require('../models/disponibilidad');
const {DateTime} = require("luxon");
const huesped = require('../models/huesped');


exports.getDisponibilidadTodos = (req,res,next) =>{

  // {$and: [
  //   {Fecha: { $gte: parseInt(req.query.ano) }},
  //   {Ano: { $lte: parseInt(req.query.ano)+1 }}
  // ]})

  const query = Disponibilidad.find(
    { 
      Fecha: { $gte: new Date(''+req.query.ano+'-'+req.query.mes+'-'+req.query.dia+''),
      $lte: new Date(''+(parseInt(req.query.ano)+1).toString()+'-'+req.query.mes+'-'+req.query.dia+'') } 
    }) 
    

  query.then((doc)=> {
    res.status(200).send(doc)
  });

}

exports.crearDisponibilidad = async (req,res,next)=>{
  
  let disponibilidadNuevaGeneral=[]
  let query
  let ano =  new Date().getFullYear()

        for(let h=0;h<req.body.numeroHabs.length;h++){
          for(let y=0;y<4;y++){
            for(let m=1;m<13;m++){
              for(let d=1; d<31;d++){
                dispo={
                  Cuarto:req.body.nombreCuarto,
                  Habitacion:req.body.numeroHabs[h].nombreHabs,
                  Estatus:1,
                  Dia:d,
                  Mes:m,
                  Ano:ano+y,
                  Estatus_Ama_De_Llaves:'Limpia',
                  Folio_Huesped:0,
                  Fecha:new Date(''+(ano+y)+'-'+m+'-'+d)
                }
                disponibilidadNuevaGeneral.push(dispo)

              }
            }
          }
        }

      
          // query = Disponibilidad.insertMany(disponibilidadNuevaGeneral);
          // query.then((doc)=> {
          //   res.status(200).send(doc)
          // });


        (async function(){

          const insertMany = await Disponibilidad.insertMany(disponibilidadNuevaGeneral);
  
          console.log(JSON.stringify(insertMany,'','\t'));
  
          res.status(200).send('Ok');
      })();

        // Disponibilidad.insertMany(disponibilidadNuevaGeneral, 
        //   { ordered: false })
        // then((res) => {
        //   console.log("Number of records inserted: " + res.insertedCount);
        //   })
  
}

exports.getDisponibilidadCompleta= async (req,res,next)=>{

  let mySet = new Set();
  let disponibilidad=[];
  let sinDisponibilidad=[];

  let llegada = req.query.llegada
  let salida = req.query.salida
  let dias = req.query.dias
  let cuarto = req.query.cuarto
  let numeroCuarto =req.query.numeroCuarto
  let folio =parseInt(req.query.folio)

  let llegadaDateTime = DateTime.fromObject({day:llegada.split('/')[0],month:llegada.split('/')[1],year:llegada.split('/')[2]});
  let SalidaDateTime = DateTime.fromObject({day:salida.split('/')[0],month:salida.split('/')[1],year:salida.split('/')[2]});
  
  let setArray=[]
  let query
  //Estatus:0=No Disponible (Ni Llegadas ni Salidas)
  //Estatus:1=Disponible
  //Estatus:2=No Llegadas
  //Estatus:3=No Salidas
  //Estatus:4=Fuera de Servicio

    for(let y=0;y<=parseInt(dias);y++)
    {
      if(cuarto!='1'){
         query = Disponibilidad.find({ Dia: llegadaDateTime.day, Mes: llegadaDateTime.month, Ano: llegadaDateTime.year,Cuarto: cuarto});
      }else{
         query = Disponibilidad.find({ Dia: llegadaDateTime.day, Mes: llegadaDateTime.month, Ano: llegadaDateTime.year});
      }
        await query.then((doc)=> {
    
            for(let i=0;i<doc.length;i++)
              {
                let dispo =doc[i]._doc

                if(dispo.Estatus==0)
                {
                  sinDisponibilidad.push(dispo.Habitacion)
                  if(numeroCuarto!='0')
                  {
                    if(parseInt(numeroCuarto) == dispo.Habitacion && cuarto == dispo.Cuarto && folio == dispo.Folio_Huesped)
                    {
                      sinDisponibilidad.pop()
                    }
                  }
                }
                if( y==0 && dispo.Estatus==2 )
                {
                  sinDisponibilidad.push(dispo.Habitacion)
                }
                if( y==parseInt(dias)+1 & dispo.Estatus==3 )
                {
                  sinDisponibilidad.push(dispo.Habitacion)
                }
                if(dispo.Estatus==4)
                {
                  sinDisponibilidad.push(dispo.Habitacion)
                }
                mySet.add(dispo.Habitacion)
              }
              for(let x=0;x<sinDisponibilidad.length;x++)
              {
                mySet.delete(sinDisponibilidad[x])
              }
        });
        llegadaDateTime=llegadaDateTime.plus({days:1})
    }
    for (let item of mySet) 
    {
      setArray.push(item);
    }

    res.status(200).send(setArray)

  }



  exports.getDisponibilidadXFecha = (req,res,next) =>{

    // var queryParameters = req.query
    // res.json(queryParameters)

    const query = Disponibilidad.find({ Dia: req.query.dia, Mes: req.query.mes, Ano: req.query.ano, Cuarto: req.query.cuarto });

    query.then((doc)=> {
      res.status(200).send(doc)
    });

}

exports.getEstatusAma = (req,res,next) =>{

  // var queryParameters = req.query
  // res.json(queryParameters)

  const query = Disponibilidad.find({ Dia: req.body.dia, Mes: req.body.mes, Ano: req.body.ano, Cuarto: req.body.habitacion,Habitacion:req.body.numeroCuarto });

  query.then((doc)=> {
    res.status(200).send(doc)
  });

}

exports.updateDisponibilidad = (req,res) => {
  Disponibilidad.findOneAndUpdate({Dia:req.body.Dia,Mes:req.body.Mes,Ano:req.body.Ano,Habitacion:req.body.Habitacion,Cuarto:req.body.Cuarto},
      {
        $set :
          {Estatus_Ama_De_Llaves:req.body.Estatus_Ama_De_Llaves}  
      },(err,doc)=>{
        if(err){
          res.status(500).send(err)
        }else
        {
          res.status(200).send(doc)
        }
      })

      huesped.findOneAndUpdate({numeroCuarto:req.body.Habitacion,habitacion:req.body.Cuarto},
        {
          $set :
            {estatus_Ama_De_Llaves:req.body.Estatus_Ama_De_Llaves}  
        },(err,doc)=>{
          if(err){
            console.log(err)
          }else
          {
            console.log(doc)
          }
        })

}
