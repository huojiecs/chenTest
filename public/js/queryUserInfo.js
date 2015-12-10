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
        fields: ['Source', 'RoleName', 'Money', 'Level', 'Physical', 'Diamond', 'Devil', 'MaxOrdinaryDuplicate','MaxPurgatoryDuplicate','DevilTower'],
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
            {text: '玩家注册渠道', width: 120, dataIndex: 'Source'},
            {text: '玩家名称', dataIndex: 'RoleName', width: 100},
            {text: '金币', dataIndex: 'Money', width: 100},
            
            {text: '等级', dataIndex: 'Level', width: 100},
            {text: '体力值', dataIndex: 'Physical', width: 100},
            {text: '钻石数', dataIndex: 'Diamond', width: 100},
            
            {text: '魔灵', dataIndex: 'Devil', width: 100},
            {text: '通关最高普通副本', dataIndex: 'MaxOrdinaryDuplicate', width: 100},
            {text: '通关最高炼狱副本', dataIndex: 'MaxPurgatoryDuplicate', width: 100},
            
            {text: '通关万魔塔层数', dataIndex: 'DevilTower', width: 100},
            {text: '用户注册时间', dataIndex: 'RegisterTime', width: 100},
            {text: '最近登陆时间', dataIndex: 'LastLoginTime', width: 100},
            
            {text: '战力值', dataIndex: 'Fight', width: 100}
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
                value: 4097,
                name: 'Cmdid'
            },
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
                    temp['RegisterTime'] = dateFormat(new Date(temp['RegisterTime'] * 1000),"yyyy-MM-dd hh:mm:ss");
                    temp['LastLoginTime'] = dateFormat(new Date(temp['LastLoginTime']* 1000),"yyyy-MM-dd hh:mm:ss");
                }
                
                var store = Ext.getCmp('sceneGridId').getStore();
                store.loadData(data);
            }
        })
    }
});





















