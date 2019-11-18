const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const customerModel = new Schema({
id_cliente: { type: Number, required: true},
cliente: { type: String, required: true},
direccion: { type: String, required: false },
telefono: { type: String, required: false}
},{collection:'catclientes_ga'});

module.exports = mongoose.model('clientes', customerModel);