var expres = require('express');
var app = expres();
var server = require('http').createServer(app);
var socketIO = require('socket.io');
var IO = socketIO(server);

var multer = require('multer');
var uuid = require('uuid/v4');

var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var passport = require('passport');
var flash = require('connect-flash');

var morgan = require('morgan');

var bodyParser = require('body-parser');
var path = require('path');
var fs = require('fs');
var _ = require('lodash');
var swig = require('swig');
require('../server/passport/passport');


app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', '../public');
app.set('view cache', false);
swig.setDefaults({ cache: false })

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/static', expres.static('../static/'));

app.use(expres.static(path.join(__dirname, '/public')));
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../static/img'),
    filename: (req, file, cb, filename) => {
        cb(null, uuid() + path.extname(file.originalname));
    }
});
app.use(multer({ storage: storage }).single('image'));



require('../server/IO/socketio')(IO);
//require('../server/IO/loadimage')(IO);
app.use(flash());
app.use(session({
    cookie: { maxAge: 60000 },
    secret: 'woot',
    resave: false,
    store: new RedisStore({}),
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());





var Routes = require('../server/routing/rutas');
Routes(app);


var port = Number(process.env.PORT || 3000);

server.listen(port, function() {
    console.log('Servidor de corriendo en:' + port);
});