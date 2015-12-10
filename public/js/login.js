Ext.onReady(function() {
    Ext.QuickTips.init();
    Ext.form.Field.prototype.msgTarget = 'side';
    var simple = new Ext.FormPanel({
        id: 'form',
        labelWidth: 65,
        defaults: {
            width: 250

        },
        defaultType: 'textfield',
        bodyStyle: 'background：#cdcdcd;padding:30 0 0 20;',
        border: false,
        buttonAlign: 'center',
        title: '用户登录',
        items: [
            {
                fieldLabel: '用户名',
                name: 'username',//元素名称  
                allowBlank: false,//不允许为空  
                blankText: '用户名不能为空'//错误提示内容  
            },
            {
                inputType: 'password',
                fieldLabel: '密　码',
                maxLength: 10,
                name: 'password',
                allowBlank: false,
                blankText: '密码不能为空'
            }

        ],
        buttons: [
            {

                text: '登录',
                type: 'submit',
                //定义表单提交事件  
                handler: save
            },
            {
                text: '重置',
                handler: function () {
                    simple.form.reset();
                }
            }
        ],
        keys: [
            {  //处理键盘回车的事件
                key: Ext.EventObject.ENTER,
                fn: save,
                scope: this
            }
        ]
    });
    var viewport = new Ext.Viewport({
                                        layout: 'border',
                                        renderTo: Ext.getBody(),
                                        items: [simple]
                                    });
    function save() {
        //提交到服务器操作  
        simple.form.submit({
                               url: '/login',
                               method: 'POST',
                               //提交成功的回调函数  
                               success: function (form, action) {
                                   var rs = JSON.parse(action.response.responseText);
                                   if (rs.result.msg == 'OK') {
                                       window.location.href = "/index";
                                   } else if (rs.result.msg == 'ERROR') {
                                       window.location.href = "/login";
                                   }
                               },
                               //提交失败的回调函数  
                               failure: function (form, action) {
                                   switch (action.failureType) {
                                       case Ext.form.Action.CLIENT_INVALID:
                                           Ext.Msg.alert('错误提示', '表单数据非法请核实后重新输入！');
                                           break;
                                       case Ext.form.Action.CONNECT_FAILURE:
                                           Ext.Msg.alert('错误提示', '网络连接异常！');
                                           break;
                                       case Ext.form.Action.SERVER_INVALID:
                                           Ext.Msg.alert('错误提示', "您的输入用户信息有误，请核实后重新输入！");
                                           simple.form.reset();
                                   }
                               }
                           });
    };

    //定义窗体
    var win = new Ext.Window({
        id:'win',
        layout:'fit',
        align:'center',
        width:330,
        height:182,
        resizable:false,
        draggable:false,
        border:false,
        bodyStyle:'padding:5px,background:gray',
        maximizable:false,
        closeAction:'close',
        closable:false,
        items:simple
       });
    win.show();
    pwd:focus(false,100);
});
