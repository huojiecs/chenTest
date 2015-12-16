var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var user = require('../models/user').user;
//var config = require('../config/development/config');   //测试环境
var config = require('../config/config');           //生产环境
/** session 配置部分 开始  */
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var setting = require('.././setting');


//'mongodb://huojiecs:chenshuo89@ds031883.mongolab.com:31883/chentest'
//mongoose.connect('mongodb://huojiecs:chenshuo89@ds031883.mongolab.com:31883/chentest');//:31883/chentest
//mongodb://d431d25b-7a88-4251-b061-d902b9d30e14:T5CLMWu_LHZxTdxOeNgzSA@10.9.58.169:27017/b135152d-4b7c-4e9f-8d9f-eafe6408d67c
//mongoose.connect(config.dbUrl);
mongoose.connect(config.dbHost+":"+config.dbPost+"/"+config.dbBase, {user: config.dbUser, pass: config.dbPass});

router.use(session({
    secret: setting.cookieSecret,
    cookie: {maxAge: 80000 },
    store: new MongoStore({
        host: config.dbHost,   //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
        port: 27017,          //数据库的端口号 27017
        db : setting.db
    })
}));
//router.use(session({
//    secret: setting.cookieSecret,
//    cookie: {maxAge: 80000 },
//    store: new MongoStore({
//        host: config.dbHost,    //数据库的地址，本机的话就是127.0.0.1，也可以是网络主机
//        port: config.dbPost,          //数据库的端口号 27017
//        db : setting.db
//    })
//}));
/** session 配置部分 结束  */

/* GET home page. */
router.get('/index', function(req, res) {
    res.render('index', { title: 'index' });
});

router.get('/', function(req, res) {
    res.render('index', { title: 'index' });
});

/*login*/
router.get('/login', function(req, res) {
    res.render('login', { title: 'login' });
});

/*logout*/
router.get('/logout', function(req, res) {
//    if(!!req.session.user){
//        console.log("logout delete Session " + req.session.user.userid);
//        //清理session
//        req.session.user = null;
//    }
    res.render('index', { title: 'logout' });
});

/*hompage*/
router.post('/homepage', function(req, res) {
    var query_doc = {userid: req.body.userid, password: req.body.password};
    console.log(query_doc);
    (function(){
        user.count(query_doc, function(err, doc){
            console.log("doc："+doc);
            if(doc == 1){   //登陆成功存入session
                console.log(query_doc.userid + ": login success in " + new Date());
                req.session.user = query_doc;
                res.render('homepage', { title: req.session.user.userid });
            }else{
                console.log(query_doc.userid + ": login failed in " + new Date());
                res.redirect('/');
            }
        });
    })(query_doc);
});

module.exports = router;