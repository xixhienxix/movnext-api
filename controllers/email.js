const nodemailer = require('nodemailer')


exports.enviarConfirmacion =async (req,res,next) =>{
try{
    let testAccount = await nodemailer.createTestAccount();
    // create reusable transporter object using the default SMTP transport
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
      let info = await transporter.sendMail({
          from: '"Mov Next 👻" <mi@movhotelsuite.com>', // sender address
          to: req.body.email, // list of receivers
          subject: "Confirmación de Reservación", // Subject line
          text: "Se confirma su reservación para el dia "+req.body.llegada+"  a nombre de :"
          +req.body.nombre+ "Por la cantidad de "+req.body.tarifa+" por cada noche",
          html:"Se confirma su reservación para el dia "+req.body.llegada+"  a nombre de :"
          +req.body.nombre+ "Por la cantidad de "+req.body.tarifa+" por cada noche"
          // html: "<b>HTML</b>", // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        res.status(200).send(info)
        // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      
}catch{
    res.status(409).send('Email Invalido')
}
   
}