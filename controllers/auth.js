const jwt = require('jsonwebtoken')
const usuarios = require('../models/usuarios')
const private_key='b8b96d8661599441631edc161db8d15c'

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
                            console.log("db_res",db_res);

                              res.status(200).send({db_res});
                            //  res.status(200).send('Algo Salio mal')

                          })

                }else 
                {res.status(409).send('NOT FOUND')}
                
                }
            });    
    

}

exports.registro = (req,res)=>{
    
    let user = {
        nombre : req.body.fullname,
        email : req.body.email,
        username : req.body.username,
        password : req.body.password,
        terminos : req.body.terminos
    }

    
  
    usuarios.create(user, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        console.log(result);
        res.send(result);
      }
    });
      

}