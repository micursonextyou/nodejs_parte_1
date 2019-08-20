var Usuario = require('../modelos/usuario');

exports.registro = async function(req, res, next) {
    var user = new Usuario({

        nombre: req.body.fullName,
        email: req.body.email,
        pass: req.body.password,
        direccion: req.body.adress,
        ciudad: req.body.city,
        sexo: req.body.genero,
        zip: req.body.zip,
        imagenes: []


    });

    await user.save(function(err, usuario) {
        if (!err) {
            res.status(201);
            next();

        } else {
            res.status(400);
            res.send("Ha ocurrido un problema");
        }
    });



}

exports.Optener_Usuarios = function(req, res, next) {
    Usuario.find(function(err, usuarios) {
        if (!err) {
            req.usuarios = usuarios;
            next();
        } else {
            console.log(err);
            res.status(500).send("Se produjo un error \n" + err);
        }
    }).sort({ $natural: -1 }).limit(1);
}