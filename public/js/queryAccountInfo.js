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
        fields: ['RoleName', 'RoleId', 'Partition', 'PlatId', 'AreaId', 'OpenId'],
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
            {text: '玩家名称', width: 120, dataIndex: 'RoleName'},
            {text: 'RoleId', dataIndex: 'RoleId', width: 100},
            {text: '服务器ID', dataIndex: 'Partition', width: 100},
            
            {text: '平台ID', dataIndex: 'PlatId', width: 100},
            {text: '大区ID', dataIndex: 'AreaId', width: 100},
            {text: 'OpenId', dataIndex: 'OpenId', width: 100}
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
                value: 4171,
                name: 'Cmdid'
            },
            {
                xtype: 'textfield',
                fieldLabel: '玩家名称',
                allowBlank : false,
                blankText:"不能为空",
                name: 'RoleName'
            }
        ],
        buttonAlign: 'center',
        buttons: [
            {
                xtype: 'button',
                text: '查询',
                scope: this,
                handler: query
            }
        ]
    });

    var viewport = new Ext.Viewport({
        layout: 'border',
        renderTo: Ext.getBody(),
        items: [query_form , sceneGrid]
    });


    function query() {
         
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
                var data = [result.body];
                if (result.head.Result != 0) {
                    alert('ErrMsg: ' + result.head.RetErrMsg);
                    return ;
                }
                for (var id in data) {
                    var temp = data[id];
                    temp['RoleName'] = decodeURIComponent(temp['RoleName']);
                }
                var store = Ext.getCmp('sceneGridId').getStore();
                store.loadData(data);
            }
        })
    }
});





















