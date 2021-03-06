/**
 * The file Create with WebStorm
 * @Author        gaosi
 * @Email         angus_gaosi@163.com
 * @Date          2015/7/31
 * To change this template use File | Setting |File Template
 */

Ext.onReady(function () {

    Ext.BLANK_IMAGE_URL = '../ext-4.2.1-gpl/resources/themes/images/default/tree/s.gif';
    Ext.form.Field.prototype.msgTarget='side';
    /**
     * userGrid,detail users' message
     */
    var sceneGrid = Ext.create('Ext.grid.Panel', {
        id: 'sceneGridId',
        region: 'center',
        split: true,
        columns: [
        ]
    });

    var query_form = new Ext.FormPanel({
                                           id: 'query_form_id',
                                           url: 'movie‐form‐submit.php',
                                           //renderTo: document.body,
                                           split: true,
                                           frame: true,
                                           title: '添加查询',
                                           region: 'north',
                                           width: 300,
                                           autoHeight: true,
                                           labelAlign: 'center',
                                           items: [
                                               {
                                                   xtype: 'hidden',
                                                   fieldLabel: '玩家id',
                                                   value: 4127,
                                                   name: 'Cmdid'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: 'RoleId',
                                                   allowBlank : false ,
                                                   blankText:"不能为空",
                                                   name: 'RoleId'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: '服务器ID',
                                                   allowBlank : false ,
                                                   blankText:"不能为空",
                                                   name: 'Partition'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: '邮件标题',
                                                   regex : /[\u4e00-\u9fa5]/,     //正则表达式在/...../之间. [\u4e00-\u9fa5] : 只能输入中文.    
                                                   regexText:"只能输入中文!",       //正则表达式错误提示    
                                                   allowBlank : false,
                                                   blankText:"不能为空",
                                                   name: 'MailTitle'
                                               },
                                               {
                                                   xtype: 'textarea',
                                                   fieldLabel: '邮件内容',
                                                   labelWidth: 100,
                                                   width: 600,
                                                   allowBlank : false ,
                                                   blankText:"不能为空",
                                                   name: 'MailContent'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: '邮件物品信息列表的最大数量',
                                                   allowBlank : false ,
                                                   blankText:"不能为空",
                                                   regex : /[0-9]/,     //正则表达式在/...../之间. [\u4e00-\u9fa5] : 只能输入中文.    
                                                   regexText:"只能输入数字!",       //正则表达式错误提示 
                                                   name: 'MailItemList_count'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: '邮件物品信息列表',
                                                   allowBlank : false ,
                                                   blankText:"不能为空",
                                                   name: 'MailItemList'
                                               }
                                               
                                           ],
                                           buttonAlign: 'center',
                                           buttons: [
                                               {
                                                   xtype: 'button',
                                                   text: '发送',
                                                   scope: this,
                                                   handler: sendMail
                                               }
                                           ]
                                       });

    var viewport = new Ext.Viewport({
                                        layout: 'border',
                                        renderTo: Ext.getBody(),
                                        items: [query_form , sceneGrid]
                                    });
    function sendMail() {
        query_form.form.submit({
                                   url: '/api/idip',
                                   method: 'POST',
                                   success: function (form, action) {
                                       //alert('Success It worked' + data);

                                       alert('Error: '+ success + "    0000: " + action.response.responseText);

                                       // var result = JSON.parse(data);
                                   },
                                   failure: function (form, action) {

                                       var result = JSON.parse(action.response.responseText);
                                       if (result.head.Result != 0) {
                                           alert('ErrMsg: ' + result.head.RetErrMsg);
                                       } else {
                                           alert('发送成功！ ');
                                       }
                                   }
                               })
    }
});





















