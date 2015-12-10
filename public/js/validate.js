var config = require('./../../../../tools/config');

var msg = '';
function check (req) {
    var uname = req.body.username;
    var pwd = req.body.password;
    var users = config.admin.users;
    var index = -1;
    for (var i = 0; i < users.length; i ++) {
        if (users[i].username == uname) {
            index = i;
            break;
        }
    }
    if (index != -1) {
        if (users[i].password == pwd) {
            msg = 'OK'
        } else {
            msg = '密码不正确';
        }
    } else {
        msg = '用户不存在';
    }
}