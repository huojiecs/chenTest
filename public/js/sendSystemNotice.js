/**
 * The file Create with WebStorm
 * @Author        gaosi
 * @Email         angus_gaosi@163.com
 * @Date          2015/7/31
 * To change this template use File | Setting |File Template
 */

Ext.onReady(function () {

    Ext.BLANK_IMAGE_URL = '../ext-4.2.1-gpl/resources/themes/images/default/tree/s.gif';

    /**
     * userGrid,detail users' message
     */
    var sceneGrid = Ext.create('Ext.grid.Panel', {
        id: 'sceneGridId',
        region: 'center',
        split: true,
      // store: sceneStore,
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
                                                   value: 4133,
                                                   name: 'Cmdid'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: '服务器id',
                                                   allowBlank : false,
                                                   blankText:"不能为空",
                                                   name: 'Partition'
                                               },
                                               {
                                                   xtype:'datetimefield',
                                                   fieldLabel: '开始时间',
                                                   format: 'Y-m-d H:i:s ',
                                                   allowBlank : false,
                                                   blankText:"不能为空",
                                                   name:'BeginTime'
                                               },
                                               {
                                                   xtype:'datetimefield',
                                                   fieldLabel: '结束时间',
                                                   format: 'Y-m-d H:i:s ',
                                                   allowBlank : false,
                                                   blankText:"不能为空",
                                                   name:'EndTime'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: '频率',
                                                   allowBlank : false,
                                                   blankText:"不能为空",
                                                   name: 'Freq'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: '发送次数',
                                                   allowBlank : false,
                                                   blankText:"不能为空",
                                                   name: 'Times'
                                               },
                                               {
                                                   xtype: 'textarea',
                                                   fieldLabel: '公告内容',
                                                   labelWidth: 100,
                                                   width: 600,
                                                   allowBlank : false,
                                                   blankText:"不能为空",
                                                   name: 'NoticeContent'
                                               }
                                           ],
                                           buttonAlign: 'center',
                                           buttons: [
                                               {
                                                   xtype: 'button',
                                                   text: '发送',
                                                   scope: this,
                                                   handler: sendNotice
                                               }
                                           ]
                                       });

    var viewport = new Ext.Viewport({
                                        layout: 'border',
                                        renderTo: Ext.getBody(),
                                        items: [query_form , sceneGrid]
                                    });
    function sendNotice() {
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





















