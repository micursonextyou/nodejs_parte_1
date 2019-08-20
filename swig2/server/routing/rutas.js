var Usuario = require('../controlers/controler');
var passport = require('passport');
const Images = require('../modelos/images');
const img = require('../controlers/imagenes');

var routes = function(app) {
    app.get('/', (req, res) => {
        // res.send(req.images);
        //res.end();
        res.render('login');
    });
    app.post('/login', passport.authenticate('local-singin', {
        successRedirect: '/main',
        failureRedirect: '/'
    }));

    app.get('/registro', (req, res, next) => {
        res.render('registro');
    });
    app.get('/main', img.OptenerImagenmes, function(req, res) {
        //res.send(req.);
        var array = req.images;
        res.render('index', { img: array });
    });
    app.post('/registro', Usuario.registro, (req, res, next) => {
        res.redirect('/');
    });
    app.get('/usuarios', Usuario.Optener_Usuarios, (req, res, next) => {
        res.send({ usuarios: req.usuarios });
        res.end();

    });
    app.get('/newimages', (req, res, next) => {
        res.render('load');
    });
    app.post('/newimages', async(req, res) => {
        const images = new Images();
        //images.title = req.boby.titulo;
        //images.descripcion = req.boby.descripcion;
        images.filename = req.file.filename;
        images.path = '../static/img/' + req.file.filename;
        images.size = req.file.size;
        await images.save();
        //console.log(images);
        res.redirect('/main');
    });
    app.get('/logout', (req, res, next) => {
        req.logout();
        res.redirect('/');
    });

    function isAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            console.log('no autenticado');
        }
        res.redirect('/');

    }





};
module.exports = routes;