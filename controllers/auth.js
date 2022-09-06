const jwt = require('jsonwebtoken')
const usuarios = require('../models/usuarios')
const private_key='b8b96d8661599441631edc161db8d15c'
const nodemailer = require('nodemailer')


exports.login = (req,res) =>{
    const username = req.body.username
    const password = req.body.password

   const query = usuarios.findOne({username:username,password:password})
    
    query.lean().exec((err, db_res)=>//lean()convert document to jsObject for easy access
            {
              if (err) {
                throw err;
              }
              else {
                if(db_res){
                    const id= db_res._id.toString()
 
                    jwt.sign({db_res},private_key,{expiresIn:'30m'},
                            (err,accessToken)=>{
                            if(err){
                                res.status(409).send('Algo Salio mal')
                            }
                            db_res.accessToken=accessToken

                              res.status(200).send({db_res});
                            //  res.status(200).send('Algo Salio mal')

                          })

                }else 
                {
                  res.status(409).send('NOT FOUND')}
                }
            });    
    

}

exports.autoriza = (req,res) =>{
  const username = req.body.usuario
  const password = req.body.password

  const queryPassword = usuarios.findOne({username:username,password:password})
  const queryUserName = usuarios.findOne({username:username})
  
  queryUserName.lean().exec((err,result)=>{
    if(err){
      res.status(400).json({message:'Error'})
    }
    else if (result==null)
    {
      res.status(200).json({id:1,message:'Nombre de usuario invalido'})
    }
    else {
      queryPassword.lean().exec((err, usuario)=>//lean()convert document to jsObject for easy access
      {
        if (err) {
          res.status(409).json({
            message: "Error intente de nuevo mas tarde",
          });           
        }
        else {
          if(usuario==null)
          { 
            res.status(200).json({id:2,message:'Password incorrecto para el usuario: '+username+''}); 
          }  
          else 
            {
              if(usuario.perfil==1)
              {
                res.status(200).json({id:3,message: "Usuario Autorizado"});
              }else {
                res.status(200).json({id:4,message:'Usuario No Autorizado'})
              }
            }
        }
      });  
    }
  })

  
  

}

exports.olvidoPassword = (req,res) => {

  const email = req.body
  const query = usuarios.findOne({email:req.body.email})
    
  query.lean().exec((err, db_res)=>//lean()convert document to jsObject for easy access
          {
            let mensaje =''
            if (err) {
              res.status(409).send('NOT FOUND')
              throw err;
            }
            else 
            {
                  const id= db_res._id.toString()
                mensaje = enviarConfirmacion(db_res.email,db_res.password)
            }
            res.status(200).send(mensaje)
          });    

}

exports.registro = (req,res)=>{
    
    let user = {
        nombre : req.body.fullname,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        terminos : req.body.terminos,
        rol:2
    }

    
  
    usuarios.create(user, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
      

};


 async function enviarConfirmacion(email,password) {
  
  try{

      let transporter = nodemailer.createTransport({
        host: "mail.movhotelsuite.com",
        port: 465,
        secure: true, // true for 465, false for other ports
        auth: {
          user: 'mi@movhotelsuite.com', // generated ethereal user
          pass: 'rocky@135', // generated ethereal password
        },
      });
    
        // send mail with defined transport object
        let info =await transporter.sendMail({
            from: '"Mov Next Password 👻" <mi@movhotelsuite.com>', // sender address
            to: email, // list of receivers
            subject: "Olvido la Contraseña", // Subject line
            text: "La Contraseña de acceso para su applicacion MovNext es:"
            +password+ ""
            // html: "<b>HTML</b>", // html body
          });
        
          return 'Exito'
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
        
  }catch{
      return 'Email Invalido'
  }
     
  };