const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 4000


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


const cors = require('cors');
const app = express();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('debug', true);//Muestra el Query en Consola
mongoose.connect(
  "mongodb://xixzeroxix:34nj6efH@cluster0-shard-00-00.kjzuz.mongodb.net:27017,cluster0-shard-00-01.kjzuz.mongodb.net:27017,cluster0-shard-00-02.kjzuz.mongodb.net:27017/MovNext?ssl=true&replicaSet=atlas-lzt57i-shard-0&authSource=admin&retryWrites=true&w=majority",
  { useNewUrlParser: true })
.then(()=>{
  console.log("Connexion a BD Correcta 123")
}).catch(error => handleError(error));


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//POST
 app.post("/api/reportes/huesped",huespedController.postHuesped);

 app.post("/api/reportes/habitacion/estatus/:id",habitacioncontroller.postEstatusHabitacion);

 app.post("/api/reportes/bloqueos/post",bloqueoController.postBloqueos);

 app.post('/api/actualiza/bloqueos',bloqueoController.actualizaBloqueos);

 app.post("/api/libera/bloqueos",bloqueoController.liberaBloqueos);

 app.post("/api/reportes/actualiza/huesped",huespedController.actualizaHuesped)

 app.post("/api/reportes/historico",historicoController.postHistorico);

 app.post("/api/actualiza/estatus",estatusController.updateEstatus);

 app.post("/api/reportes/actualiza/estatus/huesped",huespedController.actualizaEstatusHuesped)

 app.post("/api/auth/login",authController.login)

 app.post("/api/auth/registro",authController.registro)
//GET

app.get('/api/version',versionController.getVersion)

app.get('/api/reportes/origen',origenController.getOrigen)

app.get('/api/reportes/huesped',huespedController.getHuesped)

app.get('/api/reportes/historico',huespedController.getHuespedHistorico)

app.get('/api/reportes/huesped/:id',huespedController.getHuespedbyId);

app.get('/api/reportes/folios/:letra', foliocontroller.getFoliosbyLetra);

app.get('/api/reportes/folios', foliocontroller.getFolios);

//Habitaciones

app.get('/api/reportes/habitaciones',habitacioncontroller.getHabitacion)

app.get('/api/reportes/habitaciones/:codigo',habitacioncontroller.getHabitacionbyId);

app.get('/api/reportes/habitacion/:numero',habitacioncontroller.getHabitacionbyNumber);

app.get('/api/info/habitaciones',habitacioncontroller.getInfoHabitaciones);

app.get('/api/reportes/tipo',habitacioncontroller.getCodigoHabitacion);

//Disponibilidad

app.get('/api/huespedes/disponibilidad',disponibilidadController.getDisponibilidadXFecha)

app.get('/api/huespedes/disponibilidad/todos',disponibilidadController.getDisponibilidadTodos)

//Estatus

app.get('/api/reportes/estatus',estatusController.getEstatus)

app.get('/api/reportes/estatus/:id',estatusController.getEstatusbyId);

//Bloqueos

app.get('/api/reportes/bloqueos',bloqueoController.getBloqueos)

app.get('/api/get/bloqueos/:id',bloqueoController.getBloqueosbyId);

//Adicional

app.get('/api/adicionales',adicionaController.getAdicional)



//DELETE

app.delete("/api/reportes/borrar-bloqueo/:id", bloqueoController.deleteBloqueo)

//PUT




app.use(function(error, req, res, next){
  res.json(error);
});





module.exports = app;
