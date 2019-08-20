var models = require('./modeld');
Schema = models.Schema;

var usuarioSchema = new Schema({
    id: String,
    nombre: String,
    email: String,
    pass: String,
    direccion: String,
    sexo: String,
    zip: String,
    imagenes: Array
});

var Usuarios = models.model('Usuarios', usuarioSchema, 'usuarios');
module.exports = Usuarios;