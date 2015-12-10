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
        fields: ['RoleId', 'RoleName', 'Level', 'Partition', 'Title', 'DevilNum', 'DevilLevel', 'DevilSkillLevel'],
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
            {text: '玩家id', width: 120, dataIndex: 'RoleId'},
            {text: '玩家名称', dataIndex: 'RoleName', width: 100},
            {text: '玩家等级', dataIndex: 'Level', width: 100},
            {text: '玩家区服', dataIndex: 'Partition', width: 100},
            {text: '角色称号', dataIndex: 'Title', width: 100},
            {text: '邪神开启数量', dataIndex: 'DevilNum', width: 100},
            {text: '各邪神等级', dataIndex: 'DevilLevel', width: 100},
            {text: '邪神各技能等级', dataIndex: 'DevilSkillLevel', width: 100}
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
                value: 4105,
                name: 'Cmdid'
            },
            {
                xtype: 'textfield',
                fieldLabel: 'OpenId',
                allowBlank : false,
                blankText:"不能为空",
                name: 'OpenId'
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
         /*     Ext.data.JsonP.request({
         url: 'http://192.168.21.35:8130/api/query_rolelist',
         timeout: 300000,
         method: 'POST',
         params: { Cmdid: 4105,
         AreaId: 2,
         PlatId: 1,
         OpenId: "test"},
         callbackKey: "jsonPCallback",
         success: function (result) {
         Ext.Msg.alert('Success', 'It worked');
         Ext.Msg.alert('Success', 'It worked' + result[0].Result);
         },
         failure: function (result) {
         Ext.Msg.alert('Warning', 'Error: %j', result);
         }
         });*/

        /*    Ext.Ajax.request({
         url: "/api/idip",
         method: "POST",
         */
        /*params: {
         Cmdid: 4105,
         AreaId: 2,
         PlatId: 1,
         OpenId: "test"
         },*/
        /*
         form: query_form,
         success: function (result) {
         alert("result: " + result.responseText);
         var data = [];
         Ext.Msg.alert(data[0]);
         var store = Ext.getCmp('sceneGridId').getStore();
         store.loadData(data);
         },
         failure: function (result) {
         Ext.Msg.alert('Warning', 'Error: %j', JSON.parse(result));
         }
         });*/

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
                var data = result.body.RoleList;
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

//function query() {
//       window.parent.client.request('sceneInfo', null, function (err, msg) {
//        if (err) {
//            console.error('fail to request scene info:');
//            console.error(err);
//            return;
//        }
//
//        // compose display data
//        var data = [];
//        for (var id in msg) {
//            for (var i = 0; i < msg[id].length; i++) {
//                data.push({
//                    serverId: id,
//                    name: msg[id][i]['name'],
//                    kindName: msg[id][i]['kindName'],
//                    position: '(' + msg[id][i].x + ',' + msg[id][i].y + ')'
//                });
//            }
//        }
//        var store = Ext.getCmp('sceneGridId').getStore();
//        store.loadData(data);
//    });
//}





















