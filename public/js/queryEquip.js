/**
 * The file Create with WebStorm
 * @Author        gaosi
 * @Email         angus_gaosi@163.com
 * @Date          2015/7/31
 * To change this template use File | Setting |File Template
 */

Ext.onReady(function () {

    Ext.BLANK_IMAGE_URL = '../ext-4.2.1-gpl/resources/themes/images/default/tree/s.gif';


    var sceneStore = Ext.create('Ext.data.Store', {
        id: 'sceneStoreId',
        autoLoad: false,
        pageSize: 5,
        fields: ['EquipId', 'EquipName','StrenLevel','GainTime'],
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'requests'
            }
        }
    });

    /**
     * userGrid,detail users' message
     */
    var sceneGrid = Ext.create('Ext.grid.Panel', {
        id: 'sceneGridId',
        region: 'center',
        split: true,
        store: sceneStore,
        columns: [
            {xtype: 'rownumberer', width: 50, sortable: false},
            {text: '装备id', width: 120, dataIndex: 'EquipId'},
            {text: '名称', width: 120, dataIndex: 'EquipName'},
            {text: '强化等级', width: 120, dataIndex: 'StrenLevel'},
            {text: '获取时间', dataIndex: 'GainTime', width: 100}
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
                                                   fieldLabel: '操作id',
                                                   value: 4101,
                                                   name: 'Cmdid',
                                                   id : 'Cmdid'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: 'RoleId',
                                                   name: 'RoleId'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: '服务器id',
                                                   name: 'Partition'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: '装备id',
                                                   name: 'ItemId'
                                               },
                                               {
                                                   xtype: 'textfield',
                                                   fieldLabel: '装备数量',
                                                   name: 'ItemNum'
                                               }
                                           ],
                                           buttonAlign: 'center',
                                           buttons: [
                                               {
                                                   xtype: 'button',
                                                   text: '查询',
                                                   scope: this,
                                                   handler: query
                                               },
                                               {
                                                   xtype: 'button',
                                                   text: '添加装备',
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

        var radio = Ext.getCmp('Cmdid');
        radio.setValue(4123);

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

    function query() {

        var radio = Ext.getCmp('Cmdid');
        radio.setValue(4101);

        query_form.form.submit({
                                   url: '/api/idip',
                                   method: 'POST',
                                   success: function (form, action) {

                                       alert('Error: '+ success + "    0000: " + action.response.responseText);

                                   },
                                   failure: function (form, action) {
                                       var result = JSON.parse(action.response.responseText);
                                       var data = result.body.EquipList;
                                       if (result.head.Result != 0) {
                                           alert('ErrMsg: ' + result.head.RetErrMsg);
                                           return ;
                                       }
                                       var store = Ext.getCmp('sceneGridId').getStore();
                                       store.loadData(data);
                                   }
                               })
    }
});





















