var models = require('./modeld');
Schema = models.Schema;
const imgschema = new Schema({
    title: String,
    descripcion: String,
    filename: String,
    path: String,
    size: Number,
    create_ad: { type: Date, default: Date.now() }
});

var Imagenes = models.model('Images', imgschema, 'imagenes');
module.exports = Imagenes;