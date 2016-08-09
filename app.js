var credentials = require('./credentials.js');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser')();

var routes = require('./routes/index');
var users = require('./routes/users');
var GameModel = require('./models/game.js');
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
//hbs.handlebars.registerHelper('paginateHelper', paginateHelper.createPagination);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'hbs');

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
///
app.use(require('connect-flash')());

var MongoStore = require('connect-mongo')(require('express-session'));

var sessionStore = new MongoStore({ mongooseConnection: mongoose.connection });
var session = require('express-session')({
    //store: sessionStore,
    secret: credentials.cookieSecret,
    resave: false,
    saveUninitialized: true,
});
var bodyParser = require('body-parser');
app.use(bodyParser.json({
    limit: '1024mb'
}));
app.use(bodyParser.urlencoded({
    limit: '1024mb',
    extended: false
}));
app.use(cookieParser);
app.use(session);
app.use(logger('dev'));




/////////////////////

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
//app.use('/', routes);
//app.use('/users', users);
app.get('/', function(req, res, next) {
    res.render('index', {title:'可乐大爆炸'});
});
app.get('/join/:id', function(req, res, next) {
    res.render('join', {title:'可乐大爆炸',id:req.params.id})
    //res.redirect('index.html');
});

//
io.use(function(socket, next) {
    var req = socket.handshake;
    var res = {};
    cookieParser(req, res, function(err) {
        if (err) return next(err);
        session(req, res, next);
    });
});
//socket
io.sockets.on('connection', function(socket) {
    //console.log(socket.handshake);
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
        new GameModel(gameData).save(function(err, game) {
            if (err) console.log(err);
            else {
                var url = 'http://lovo.himyweb.com/join/' + game._id;
                socket.join(game._id);
                qr.toDataURL(url, {
                    'margin': 0,
                    'scale': 6
                }, function(error, dataURL) {
                    if (error) console.log(error);
                    socket.join(game._id);
                    console.log('create:', 'session id:'+sessionID, 'game id:'+game._id);
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
        socket.gameId = id;
        GameModel.findById(id, function(err, result) {
            if (err || !result) {
                fn({
                    ret: 1001,
                    msg: '没有找到游戏嗷~',
                });
            } else if (result.sid == sessionID) {
                fn({
                    ret: 1002,
                    msg: '不能加入自己创建游戏~',
                });
            } else if (result.status == 1) {
                fn({
                    ret: 1003,
                    msg: '游戏已结束~',
                });
            } else if (result.status == 0 && Date.now() > result.createdAt.getTime() + 65000) {
                fn({
                    ret: 1004,
                    msg: '游戏已超时~',
                });
            } else if (result.joinId != null && result.joinId != sessionID) {
                console.log('join:', 'session id:'+sessionID, 'join id:'+result.joinId);
                fn({
                    ret: 1005,
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
                    console.log('join:', 'session id:'+sessionID, 'game id:'+socket.gameId);
                    socket.joinId = sessionID;
                    socket.join(id);
                    socket.broadcast.to(id).emit('join message', {
                        ret: 0,
                        joinId: sessionID,
                    });
                });
            }
        });
    });

    socket.on('open', function (id, fn) {
        GameModel.findById(id, function(err, result) {
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
                result.status = 1;
                result.save(function(err) {
                    if (err) console.log(err);
                    fn({
                        ret: 0,
                        msg: '',
                    });
                    console.log('open:', 'session id:'+sessionID, 'game id:'+id);
                    socket.broadcast.to(id).emit('open message', {
                        ret: 0,
                        msg: ''
                    });
                });

            }
        });
    })

    socket.on('disconnect', function () {
        if( socket.gameId ){
            var id = socket.gameId;
            socket.leave(id);
            console.log('disconnect:', 'session id:'+sessionID, 'game id:'+socket.gameId);
            socket.broadcast.to(id).emit('leave message', {
                ret: 0,
                msg: ''
            });
        }

    });


    socket.on('send', function(data) {
        console.log(data, 'sending message');
        io.sockets.in(data.id).emit('message', data);
    });
});



module.exports = app;
