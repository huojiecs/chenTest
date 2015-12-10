/**
 * Created by xykong on 2014/7/28.
 */
var pomelo = require('pomelo');
var logger = require('pomelo/node_modules/pomelo-logger').getLogger('anhei', __filename);
var idipCenter = require('./idipCenter');
var webCenter = require('./web/webCenter');
var Q = require('q');
var _ = require('underscore');

var Handler = module.exports;

Handler.isWeb = function () {
    return pomelo.app.getServerId().indexOf('web') !== -1;
};

Handler.InitServer = function () {
    /**初始化服务器*/
    if (!!this.isWeb()) {
        webCenter.Init();
    } else {
        idipCenter.Init();
    }
    return Q.resolve();
};
