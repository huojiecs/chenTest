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
        fields: ['AssetID', 'AssetName','Num'],
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
            {text: '财产id', width: 120, dataIndex: 'AssetID'},
            {text: '名称', width: 120, dataIndex: 'AssetName'},
            {text: '财产数量', dataIndex: 'Num', width: 100}
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
                value: 4099,
                name: 'Cmdid',
                id : 'Cmdid'
            },
  /*          {
                xtype      : 'fieldcontainer',
                fieldLabel : '操作',
                defaultType: 'radiofield',
                defaults: {
                    flex: 1
                },
                layout: 'hbox',
                items: [
                    {
                        boxLabel  : '查询',
                        name      : 'Cmdid',
                        inputValue: '4099',
                        id        : 'radio1'
                    }, {
                        boxLabel  : '修改',
                        name      : 'Cmdid',
                        inputValue: '4119',
                        id        : 'radio2'
                    }
                ]
            },*/
            {
                xtype: 'textfield',
                fieldLabel: 'RoleId',
                allowBlank : false,
                blankText:"不能为空",
                name: 'RoleId'
            },
            {
                xtype: 'textfield',
                fieldLabel: '服务器id',
                allowBlank : false,
                blankText:"不能为空",
                name: 'Partition'
            },
            {
                xtype: 'textfield',
                fieldLabel: '财产id',
                name: 'AssetId'
            },
            {
                xtype: 'textfield',
                fieldLabel: '财产数量',
                name: 'Value'
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
                text: '修改财产',
                scope: this,
                handler: update
            },
            {
                xtype: 'button',
                text: '重置财产',
                scope: this,
                handler: reset
            }
        ]
    });

    var viewport = new Ext.Viewport({
        layout: 'border',
        renderTo: Ext.getBody(),
        items: [query_form , sceneGrid]
    });
    
    function query() {

        var radio = Ext.getCmp('Cmdid');
        radio.setValue(4099);

        query_form.form.submit({
                                   url: '/api/idip',
                                   method: 'POST',
                                   success: function (form, action) {

                                       alert('Error: '+ success + "    0000: " + action.response.responseText);

                                   },
                                   failure: function (form, action) {
                                       var result = JSON.parse(action.response.responseText);
                                       var data = result.body.AssetList;
                                       if (result.head.Result != 0) {
                                           alert('ErrMsg: ' + result.head.RetErrMsg);
                                           return ;
                                       }
                                       var store = Ext.getCmp('sceneGridId').getStore();
                                       store.loadData(data);
                                   }

                               })
    }
    function update() {

        var radio = Ext.getCmp('Cmdid');
        radio.setValue(4119);

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
                    alert('修改成功！ ');
                }
            }
        })
    }

    function reset() {

        var radio = Ext.getCmp('Cmdid');
        radio.setValue(4121);

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
                                           alert('修改成功！ ');
                                       }
                                   }
                               })
    }
});





















