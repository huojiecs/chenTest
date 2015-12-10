
Ext.onReady(function () {

    Ext.BLANK_IMAGE_URL = '../ext-4.2.1-gpl/resources/themes/images/default/tree/s.gif';


    var sceneStore = Ext.create('Ext.data.Store', {
        id: 'sceneStoreId',
        autoLoad: false,
        pageSize: 5,
		fields: [
					'roleID', 
			'tempID', 
			'num'
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
				{text: '玩家ID', dataIndex: 'roleID', width: 120}
				,
				{text: '财产ID', dataIndex: 'tempID', width: 120}
				,
				{text: '财产数量', dataIndex: 'num', width: 120}
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
                            fieldLabel: '玩家ID',
                            name: 'roleID'
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
            params:{'tableName':'assets',
            		'paramStr':  
                                'roleID = '+query_form.getForm().getValues()['roleID'] , 
            'fields': [
                                                                             			'roleID', 
                                                                             			'tempID', 
                                                                             			'num'
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
