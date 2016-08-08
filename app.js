var credentials = require('./credentials.js');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser')();
var bodyParser = require('body-parser');
var session = require('express-session')({
    store: sessionStore,
    secret: credentials.cookieSecret,
    resave: false,
    saveUninitialized: true,
});

var routes = require('./routes/index');
var users = require('./routes/users');
var Game = require('./models/game.js');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);

//QR
var qr = require('qrcode');

app.use(express.static(path.join(__dirname, 'public')));
//监听端口
app.set('port', process.env.PORT || 3000);
server.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
var paginateHelper = require('express-handlebars-paginate');
// view engine setup
var handlebars = require('express-handlebars');
var hbs = handlebars.create({
    defaultLayout: 'main',
    helpers: {
        static: function(name) {
            return require('./lib/static.js').map(name);
        },
        section: function(name, options) {
            if (!this._sections) this._sections = {};
            this._sections[name] = options.fn(this);
            return null;
        }
    }
})
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');


///
app.use(require('connect-flash')());
var MongoSessionStore = require('session-mongoose')(require('connect')),
    sessionStore = new MongoSessionStore({
        url: credentials.mongo[app.get('env')].connectionString
    }),
    bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: '1024mb'
}));
app.use(bodyParser.urlencoded({
    limit: '1024mb',
    extended: false
}));
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser);
app.use(session);
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));


// database configuration
var mongoose = require('mongoose');
var options = {
    server: {
        socketOptions: {
            keepAlive: 1
        }
    }
};
mongoose.Promise = global.Promise;
switch (app.get('env')) {
    case 'development':
        mongoose.connect(credentials.mongo.development.connectionString, options);
        app.set('json spaces', 2);
        break;
    case 'production':
        mongoose.connect(credentials.mongo.production.connectionString, options);
        app.set('json spaces', 0);
        break;
    default:
        throw new Error('Unknown execution environment: ' + app.get('env'));
}



/////////////////////
//app.use('/', routes);
//app.use('/users', users);
app.get('/', function(req, res, next) {
    res.redirect('index.html');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//
io.use(function(socket, next) {
    session(socket.handshake, {}, next);
    //next();
});
//socket
io.sockets.on('connection', function(socket) {
    var sessionID = socket.handshake.sessionID;
    var address = socket.handshake.address;
    var host = socket.handshake.headers.host;
    socket.on('create', function(data) {

        var gameData = {
            sid: sessionID,
            joinId: null,
            createdAt: Date.now(),
            ipAddress: address
        };
        new Game(gameData).save(function(err, game) {
            if (err) console.log(err);
            else {
                var url = 'http://localhost:3000/join.html?id=' + game._id;
                socket.join(game._id);
                qr.toDataURL(url, {
                    'margin': 0,
                    'scale': 6
                }, function(error, dataURL) {
                    if (error) console.log(error);

                    socket.emit('create message', {
                        id: game._id,
                        url: url,
                        imgData: dataURL,
                    });
                });
            }
        });
    });
    socket.on('join', function (id, fn) {
        Game.findById(id, function(err, result) {
            if (err) {
                fn({
                    ret: 1001,
                    msg: '没有找到游戏嗷~',
                });
            } else if (result.sid == sessionID) {
                fn({
                    ret: 1002,
                    msg: '不能加入自己创建游戏~',
                });
            } else if (result.joinId == null && Date.now() > result.createdAt.getTime() + 60000) {
                fn({
                    ret: 1003,
                    msg: '游戏已超时~',
                });
            } else if (result.joinId != null && result.joinId != sessionID) {
                fn({
                    ret: 1003,
                    msg: '抱歉，游戏已有其他用户加入~',
                });
            } else {
                //更新joinId
                result.joinId = sessionID;
                result.save(function(err) {
                    if (err) console.log(err);
                    fn({
                        ret: 0,
                        msg: '',
                    });
                    socket.join(id);
                    socket.broadcast.to(id).emit('join message', {
                        ret: 0
                    });
                });
            }
        });
    });

    socket.on('open', function (id, fn) {
        console.log(id);
        Game.findById(id, function(err, result) {
            if (err) {
                fn({
                    ret: 1001,
                    msg: '没有找到游戏嗷~',
                });
            }
            else if(result.joinId == null){
                fn({
                    ret: 1002,
                    msg: '游戏还没有参与者哦,不能直接开瓶'
                });
            }
            else if(sessionID != result.sid && sessionID != result.joinId){
                fn({
                    ret: 1003,
                    msg: '您不是游戏的创建者或参与者'
                });
            }
            else{
                fn({
                    ret: 0,
                    msg: ''
                });
                socket.broadcast.to(id).emit('open message', {
                    ret: 0,
                    msg: ''
                });
            }
        });
    })

    socket.on('leave', function(id) {
        console.log('leaving', id);
        socket.leave(id);
    })

    socket.on('send', function(data) {
        console.log(data, 'sending message');
        io.sockets.in(data.id).emit('message', data);
    });
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
