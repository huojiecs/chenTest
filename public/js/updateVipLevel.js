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
        columns: [

        ]
    });

    var query_form = new Ext.FormPanel({
                                           id: 'query_form_id',
                                           url: 'movie‐form‐submit.php',
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
                                                   value: 4169,
                                                   name: 'Cmdid'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: 'OpenId',
                                                   allowBlank : false ,
                                                   blankText:"不能为空",
                                                   name: 'OpenId'
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
                                                   fieldLabel: '服务器id',
                                                   allowBlank : false ,
                                                   blankText:"不能为空",
                                                   name: 'Partition'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: 'Vip等级',
                                                   allowBlank : false ,
                                                   blankText:"不能为空",
                                                   name: 'Value'
                                               }
                                               
                                           ],
                                           buttonAlign: 'center',
                                           buttons: [
                                               {
                                                   xtype: 'button',
                                                   text: '添加Vip等级',
                                                   scope: this,
                                                   handler: add
                                               }
                                           ]
                                       });

    var viewport = new Ext.Viewport({
                                        layout: 'border',
                                        renderTo: Ext.getBody(),
                                        items: [query_form , sceneGrid]
                                    });
    function add() {
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
                                           alert('添加成功！ ');
                                       }
                                   }
                               })
    }
});





















