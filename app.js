//----------------------------------------------------------------------------------------
//1.-Requerir librerías y drivers
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const MongoDBUrl = require('./keys');
const Controller = require('./controllers/admin');
//----------------------------------------------------------------------------------------
//2.-Configurar web server y parsee los datos
const app = express();
const port = 1500;
app.use(bodyParser.json());

//----------------------------------------------------------------------------------------
//3.- Definir paths disponibles
app.get('/', (req, res) => {
    res.send('Servidor activo.... Porfavor use /api/customers');
    console.log("request a raiz del server de apis-----")
});
app.get('/api/customers', Controller.customersInq);
app.post('/api/customers', Controller.customerAdd);


//----------------------------------------------------------------------------------------
//4.- Encender webserver y dbserver
app.listen(port, () => {
    console.log('Server Inicializado en el puerto: ' + port);

    mongoose.connect(MongoDBUrl.conn, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Server mongodb Conectado...')
    }, err => { console.log(err) });
});
//----------------------------------------------------------------------------------------
//prueba de insert en el body
// {
//     "id_cliente": 10001,
//     "cliente": "Jorge Pedante",
//     "direccion": "Calle XXXXX # 400 Col, YYYYY, CP 20040",
//     "telefono": "52-5527143789"
// }