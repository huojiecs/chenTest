
Ext.onReady(function () {

    Ext.BLANK_IMAGE_URL = '../ext-4.2.1-gpl/resources/themes/images/default/tree/s.gif';


    var sceneStore = Ext.create('Ext.data.Store', {
        id: 'sceneStoreId',
        autoLoad: false,
        pageSize: 5,
		fields: [
					'GameSvrId', 
			'dtEventTime', 
			'Sequence', 
			'vGameAppid', 
			'PlatID', 
			'vopenid', 
			'iGoodsType', 
			'iGoodsId', 
			'AfterCount', 
			'Count', 
			'Reason', 
			'SubReason', 
			'AddOrReduce', 
			'Level'
		],
        proxy: {
            type: 'memory',
            reader: {
                type: 'json',
                root: 'requests'
            }
        }
    });

    var sceneGrid = Ext.create('Ext.grid.Panel', {
        id: 'sceneGridId',
        region: 'center',
        split: true,
        store: sceneStore,
        columns: [
            {xtype: 'rownumberer', sortable: false, width: 50},
				{text: '(必填)登录的游戏服务器编号', dataIndex: 'GameSvrId', width: 120}
				,
				{text: '(必填)游戏事件的时间, 格式 YYYY-MM-DD HH:MM:SS', dataIndex: 'dtEventTime', width: 120}
				,
				{text: '(可选)用于关联一次动作产生多条不同类型的道具流动日志', dataIndex: 'Sequence', width: 120}
				,
				{text: '(必填)游戏APPID', dataIndex: 'vGameAppid', width: 120}
				,
				{text: '(必填)ios 0/android 1', dataIndex: 'PlatID', width: 120}
				,
				{text: '(必填)玩家', dataIndex: 'vopenid', width: 120}
				,
				{text: '(必填)道具类型', dataIndex: 'iGoodsType', width: 120}
				,
				{text: '(必填)道具ID', dataIndex: 'iGoodsId', width: 120}
				,
				{text: '(必填)动作后的物品存量', dataIndex: 'AfterCount', width: 120}
				,
				{text: '(必填)动作涉及的物品数量', dataIndex: 'Count', width: 120}
				,
				{text: '(必填)道具流动一级原因', dataIndex: 'Reason', width: 120}
				,
				{text: '(必填)道具流动二级原因', dataIndex: 'SubReason', width: 120}
				,
				{text: '(必填)增加 0/减少 1', dataIndex: 'AddOrReduce', width: 120}
				,
				{text: '(必填)玩家等级', dataIndex: 'Level', width: 120}
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
                fieldLabel: '操作id',
                value: 4177,
                name: 'Cmdid',
                id : 'Cmdid'
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
                            fieldLabel: '(必填)登录的游戏服务器编号',
                            name: 'GameSvrId'
                         }
                        ,
                         {
                             xtype: 'zc_form_DatetimeField',
                             width : 300,
                             labelWidth : 80,
                             fieldLabel: '(必填)游戏事件的时间, 格式 YYYY-MM-DD HH:MM:SS',
//                             format:'Y-m-d H:m:s',
//                             allowBlank : false,
//                             blankText:"不能为空",
                             name: 'dtEventTime'
                         }  
                       ,
                         {
                            xtype: 'textfield',
                            fieldLabel: '(必填)玩家',
                            name: 'vopenid'
                         }
                        ,
                        {
                            xtype: 'combo',
                            fieldLabel: '(必填)道具流动一级原因',
                            name: 'Reason',
                            displayField: 'desc',
                            valueField: 'value',
                            store:new Ext.data.Store({
                                           
                                           fields: ['desc', 'value'],
                                           data : [
                                                        {"desc":"系统产出或消耗", "value":"0"}
                                                        ,
                                                        {"desc":"商店交易", "value":"1"}
                                                        ,
                                                        {"desc":"充值", "value":"2"}
                            ]}),
                            emptyText:'请选择',
                            blankText : '请选择',
                            editable :false
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
            params:{'tableName':'ItemFlow',
            		'paramStr':  
                                'GameSvrId = '+query_form.getForm().getValues()['GameSvrId']  +' and ' + 
 
                                'dtEventTime = '+query_form.getForm().getValues()['dtEventTime']  +' and ' + 
 
                                'vopenid = '+query_form.getForm().getValues()['vopenid']  +' and ' + 
 
                                'Reason = '+query_form.getForm().getValues()['Reason'] , 
            'fields': [
                                                                             			'GameSvrId', 
                                                                             			'dtEventTime', 
                                                                             			'Sequence', 
                                                                             			'vGameAppid', 
                                                                             			'PlatID', 
                                                                             			'vopenid', 
                                                                             			'iGoodsType', 
                                                                             			'iGoodsId', 
                                                                             			'AfterCount', 
                                                                             			'Count', 
                                                                             			'Reason', 
                                                                             			'SubReason', 
                                                                             			'AddOrReduce', 
                                                                             			'Level'
             ]},
            success: function (form, action) {
                alert('Error: '+ success + "    0000: " + action.response.responseText);
            },
            failure: function (form, action) {

                var result = JSON.parse(action.response.responseText);
                var data = result.body.dataList;
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
