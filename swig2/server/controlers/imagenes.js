var Images = require('../modelos/images');
exports.OptenerImagenmes = function(req, res, next) {
    Images.find(function(err, images) {
        if (!err) {
            req.images = images;
            next();
        } else {
            console.log(err);
            res.status(500).send("Se produjo un error \n" + err);
        }
    });
}