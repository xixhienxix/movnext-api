const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT||4000
const cors = require('cors');
const multer= require('multer')
const initDB= require('./config/db')
var url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/MovNext'
/**Controllers
 * 
 */
const createController = require('./controllers/create')

const huespedController = require('./controllers/huesped')
const foliocontroller = require('./controllers/folio')
const estatusController = require('./controllers/estatus')
const habitacioncontroller = require('./controllers/habitacion')
const disponibilidadController = require('./controllers/disponibilidad')
const bloqueoController = require('./controllers/bloqueo')
const versionController = require('./controllers/version')
const origenController = require('./controllers/origen')
const historicoController = require ('./controllers/historico')
const adicionaController = require ('./controllers/adicional')
const authController = require ('./controllers/auth')
const edoCuentaController = require ('./controllers/edoCuenta')
const codigosController = require ('./controllers/codigos.js')
const emailController = require ('./controllers/email.js')
const promesasController = require ('./controllers/promesas.js')
const detailsController = require ('./controllers/details.js')
const amaController = require ('./controllers/ama.js')
const timeZonesController = require ('./controllers/timezones')
const divisasController = require ('./controllers/divisas')
const parametrosController = require('./controllers/parametros')
const tarifasController = require('./controllers/tarifas')
const imageController = require('./controllers/images.js')
const calendarioController = require('./controllers/calendario.js')

/**Models */
var imgModel = require('./models/img.js');


const app = express();
var Admin = mongoose.mongo.Admin
const serverStatus = () => {
  return { 
     state: 'up', 
     dbState: mongoose.STATES[mongoose.connection.readyState] 
  }
};

app.use(cors());

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.set('debug', true);//Muestra el Query en Consola
mongoose.connect(url, { useNewUrlParser: true },{server: {poolSize: 100}})
  .then(() => {
    console.log('Connected to MongoDB.');
  })
  .catch(err => console.error(err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'uploads')
  },
  filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now())
  }
});

// If the connection throws an error
mongoose.connection.on("error", function(err) {
  console.error('Failed to connect to DB ' + url + ' on startup ', err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {
  console.log('Mongoose default connection to DB :' + url + ' disconnected');
});

var gracefulExit = function() { 
  mongoose.connection.close(function () {
    console.log('Mongoose default connection with DB :' + url + ' is disconnected through app termination');
    process.exit(0);
  });
}

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

var upload = multer({ storage: storage });
// app.get("/api/listaHoteles", (req,res)=>{
// /// create a connection to the DB    
// var connection = mongoose.createConnection(
//   'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/Master');
// connection.on('open', function() {
//   // connection established
//   new Admin(connection.db).listDatabases(function(err, result) {
//       // database list stored in result.databases
//       var allDatabases = result.databases;   
//       return  res.status(200).send(result.databases)//res.send('Succesfully saved.');
 
//   });
// });
// })


app.use('/api/status', require('express-healthcheck')({
  healthy: serverStatus
}));
//POST
 app.post("/api/reportes/huesped",huespedController.postHuesped);

 app.post("/api/reportes/habitacion/estatus/:id",habitacioncontroller.postEstatusHabitacion);

 app.post("/api/reportes/bloqueos/post",bloqueoController.postBloqueos);

 app.post('/api/actualiza/bloqueos',bloqueoController.actualizaBloqueos);

 app.post("/api/libera/bloqueos",bloqueoController.liberaBloqueos);

 app.post("/api/reportes/actualiza/huesped",huespedController.actualizaHuesped)

 app.post("/api/reportes/actualiza/huesped/modifica",huespedController.actualizaHuespedModifica)

 app.post("/api/guarda/historico",historicoController.postHistorico);

 app.post("/api/actualiza/estatus",estatusController.updateEstatus);

 app.post("/api/reportes/actualiza/estatus/huesped",huespedController.actualizaEstatusHuesped)

 app.post("/api/auth/login",authController.login)

 app.post("/api/createdb",createController.create)

 app.post("/api/auth/registro",authController.registro)

 app.post("/api/edo_cuenta/pagos",edoCuentaController.agregarPago)

 app.post("/api/email/confirmacion",emailController.enviarConfirmacion)
 
 app.post("/api/reportes/promesa",promesasController.promesaPago);

 app.post("/api/reportes/details",detailsController.postDetails);

 app.post("/api/disponibilidad/ama",disponibilidadController.getEstatusAma);

 app.post("/api/disponibilidad/crear",disponibilidadController.crearDisponibilidad);

 //Parametros

 app.post("/api/parametros",parametrosController.postParametros);

 //Login
 app.post("/api/auth/forgot",authController.olvidoPassword);

 app.post("/api/auth/autoriza",authController.autoriza);

 //Habitaciones

 app.post("/api/habitacion/guardar",habitacioncontroller.nuevaHabitacion)

 app.post("/api/habitacion/agregar",habitacioncontroller.agregarInventario)

 app.post("/api/habitacion/buscar",habitacioncontroller.buscarHabitacion)

 app.post("/api/update/habitacion/imageurl",habitacioncontroller.actualizaUrlImagen)


//Tarifas

app.post("/api/tarifas/agregar",tarifasController.postTarifas);

app.post("/api/tarifas/especial/agregar",tarifasController.postTarifaEspecial);


//GET

app.get('/api/version',versionController.getVersion)

app.get('/api/reportes/origen',origenController.getOrigen)

app.get('/api/parametros/timezones',timeZonesController.getTimeZones)

app.get('/api/parametros/divisas',divisasController.getDivisas)

app.get('/api/parametros/divisas/:divisa',divisasController.getDivisasByParametro)

app.get('/api/parametros',parametrosController.getParametros)

app.get('/api/reportes/huesped',huespedController.getHuesped)

app.get('/api/reportes/clientes',historicoController.getClientes)

app.get('/api/reportes/historico',huespedController.getHuespedHistorico)

app.get('/api/reportes/huesped/:id',huespedController.getHuespedbyId);

app.get('/api/reportes/folios/:letra', foliocontroller.getFoliosbyLetra);

app.get('/api/reportes/folios', foliocontroller.getFolios);

app.get('/api/codigos', codigosController.getCodigosDeCargo);

app.get('/api/reportes/promesas/:folio',promesasController.getPromesa)

app.get('/api/reportes/ama_llaves',amaController.getEstatus)

app.get('/api/reportes/ama_llaves/:id',amaController.getEstatusByID)

//Historicos

// app.get('/api/parametros/timezones', parametrosController.getTimeZones)


app.get('/api/reportes/historico/visitas/:id',historicoController.getHistoricoVisitas)

app.post('/api/historico/actualizaDatos',historicoController.actualizaDatos)

//Habitaciones

app.get('/api/reportes/habitaciones',habitacioncontroller.getHabitacion)

app.get('/api/reportes/habitaciones/:codigo',habitacioncontroller.getHabitacionbyId);

app.get('/api/reportes/habitacion/:numero',habitacioncontroller.getHabitacionbyNumber);

app.get('/api/info/habitaciones',habitacioncontroller.getInfoHabitaciones);

app.get('/api/reportes/tipo',habitacioncontroller.getCodigoHabitacion);

app.get('/api/codigos/habitaciones',habitacioncontroller.getAll)

//CODIGOS

app.get('/api/codigos/tipos_habitacion',codigosController.getTiposHabitaciones)

app.get('/api/codigos/amenidades',codigosController.getAmenidades)

app.get('/api/codigos/camas',codigosController.getCamas)

//Calendario

app.get('/api/calendario/habitaciones',calendarioController.getHabitaciones)


//Disponibilidad

app.get('/api/huespedes/disponibilidad',disponibilidadController.getDisponibilidadXFecha)

app.get('/api/huespedes/disponibilidad/todos',disponibilidadController.getDisponibilidadTodos)

app.get('/api/disponibilidad/completa',disponibilidadController.getDisponibilidadCompleta)


//Estatus

app.get('/api/reportes/estatus',estatusController.getEstatus)

app.get('/api/reportes/estatus/:id',estatusController.getEstatusbyId);

//Bloqueos

app.get('/api/reportes/bloqueos',bloqueoController.getBloqueos)

app.get('/api/get/bloqueos/:id',bloqueoController.getBloqueosbyId);

//Adicional

app.get('/api/adicionales',adicionaController.getAdicional)

//EDO CUENTA

app.get('/api/edo_cuenta/cuenta/:id',edoCuentaController.getCuentas);

app.get('/api/edo_cuenta/cuentas',edoCuentaController.getTodasLasCuentas);


//DETAILS

app.get('/api/details',detailsController.getDetails)

app.get('/api/details/:folio',detailsController.getDetailsById)

// Tarifas

app.get('/api/tarifario/tarifas',tarifasController.getTarifas)

app.get('/api/tarifario/tarifas/rack',tarifasController.getTarifaRack)

//DELETE

app.delete("/api/reportes/borrar-bloqueo/:id", bloqueoController.deleteBloqueo)

app.delete("/api/reportes/promesa/delete/:_id", promesasController.deletePromesa)

app.delete("/api/huesped/delete/:_id",huespedController.deleteHuesped)

app.delete("/api/habitacion/delete/:_id",habitacioncontroller.deleteHabitacion)

app.post("/api/tarifas/rack/delete",tarifasController.deleteTarifaRack);

app.post("/api/tarifas/especial/delete",tarifasController.deleteTarifaRackEspecial);


//PUT

app.put("/api/reportes/promesas/update",promesasController.updatePromesa)

app.put("/api/reportes/promesas/update/estatus",promesasController.updatePromesaEstatus)

app.put("/api/edo_cuenta/pagos", edoCuentaController.updateEstatusPago)

app.put("/api/edo_cuenta/alojamiento", edoCuentaController.actualizaSaldo)

app.put("/api/update/disponibilidad",disponibilidadController.updateDisponibilidad)


//IMAGES

app.get("/api/upload/image/habitacion",imageController.uploadHabitacion)


//BOOKING

app.get("/api/booking/disponibilidad", disponibilidadController.disponibilidadBooking)


app.use(function(error, req, res, next){
  res.json(error);
});

app.get("/", (req,res)=>{
  res.send("HELLO")
})





module.exports = app;
