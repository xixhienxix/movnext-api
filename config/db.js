const mongoose =require('mongoose')
var url = 'mongodb+srv://xixzeroxix:34nj6efH@cluster0.kjzuz.mongodb.net/'

module.exports = () =>{
    const connect = (hotel) => {
            mongoose.connect(url+hotel,{
        keepAlive:true,
        useNewUrlParser:true,
        useUnifiedTopology:true
    },
    (err)=>{
        if(err) {
            console.log('DB Error de conexion')
        }else{
            console.log('conexion correcta')
        }
        })
    }
    connect();
}