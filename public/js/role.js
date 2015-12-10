
Ext.onReady(function () {

    Ext.BLANK_IMAGE_URL = '../ext-4.2.1-gpl/resources/themes/images/default/tree/s.gif';


    var sceneStore = Ext.create('Ext.data.Store', {
        id: 'sceneStoreId',
        autoLoad: false,
        pageSize: 5,
		fields: [
					'roleID', 
			'accountID', 
			'name', 
			'tempID', 
			'expLevel', 
			'exp', 
			'zhanli', 
			'lifeNum', 
			'loginTime', 
			'vipPoint', 
			'LoginPrize', 
			'vipLevel', 
			'unionID', 
			'unionName', 
			'Story', 
			'accountType', 
			'isBind', 
			'createTime', 
			'activeEnhanceSuitID', 
			'activeInsetSuitID', 
			'refreshTime', 
			'activeFashionWeaponID', 
			'activeFashionEquipID', 
			'isNobility', 
			'isQQMember', 
			'titleID', 
			'picture', 
			'nickName', 
			'openID', 
			'serverUid'
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
				{text: '账户ID', dataIndex: 'accountID', width: 120}
				,
				{text: '角色名', dataIndex: 'name', width: 120}
				,
				{text: '职业ID', dataIndex: 'tempID', width: 120}
				,
				{text: '等级', dataIndex: 'expLevel', width: 120}
				,
				{text: '经验', dataIndex: 'exp', width: 120}
				,
				{text: '战力', dataIndex: 'zhanli', width: 120}
				,
				{text: '生命', dataIndex: 'lifeNum', width: 120}
				,
				{text: '登录时间', dataIndex: 'loginTime', width: 120}
				,
				{text: 'vip点', dataIndex: 'vipPoint', width: 120}
				,
				{text: '登陆奖励', dataIndex: 'LoginPrize', width: 120}
				,
				{text: 'vip等级', dataIndex: 'vipLevel', width: 120}
				,
				{text: '公会ID', dataIndex: 'unionID', width: 120}
				,
				{text: '公会名称', dataIndex: 'unionName', width: 120}
				,
				{text: 'Story', dataIndex: 'Story', width: 120}
				,
				{text: '账户类型', dataIndex: 'accountType', width: 120}
				,
				{text: '是否绑定', dataIndex: 'isBind', width: 120}
				,
				{text: '创建时间', dataIndex: 'createTime', width: 120}
				,
				{text: '强化时装ID', dataIndex: 'activeEnhanceSuitID', width: 120}
				,
				{text: '镶嵌时装ID', dataIndex: 'activeInsetSuitID', width: 120}
				,
				{text: '刷新时间', dataIndex: 'refreshTime', width: 120}
				,
				{text: '装备ID', dataIndex: 'activeFashionWeaponID', width: 120}
				,
				{text: '武器ID', dataIndex: 'activeFashionEquipID', width: 120}
				,
				{text: '玩家ID', dataIndex: 'isNobility', width: 120}
				,
				{text: '是否是qq会员', dataIndex: 'isQQMember', width: 120}
				,
				{text: '称号ID', dataIndex: 'titleID', width: 120}
				,
				{text: '图像', dataIndex: 'picture', width: 120}
				,
				{text: '昵称', dataIndex: 'nickName', width: 120}
				,
				{text: 'openID', dataIndex: 'openID', width: 120}
				,
				{text: '服务器Id', dataIndex: 'serverUid', width: 120}
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
            params:{'tableName':'role',
            		'paramStr':  
                                'roleID = '+query_form.getForm().getValues()['roleID'] , 
            'fields': [
                                                                             			'roleID', 
                                                                             			'accountID', 
                                                                             			'name', 
                                                                             			'tempID', 
                                                                             			'expLevel', 
                                                                             			'exp', 
                                                                             			'zhanli', 
                                                                             			'lifeNum', 
                                                                             			'loginTime', 
                                                                             			'vipPoint', 
                                                                             			'LoginPrize', 
                                                                             			'vipLevel', 
                                                                             			'unionID', 
                                                                             			'unionName', 
                                                                             			'Story', 
                                                                             			'accountType', 
                                                                             			'isBind', 
                                                                             			'createTime', 
                                                                             			'activeEnhanceSuitID', 
                                                                             			'activeInsetSuitID', 
                                                                             			'refreshTime', 
                                                                             			'activeFashionWeaponID', 
                                                                             			'activeFashionEquipID', 
                                                                             			'isNobility', 
                                                                             			'isQQMember', 
                                                                             			'titleID', 
                                                                             			'picture', 
                                                                             			'nickName', 
                                                                             			'openID', 
                                                                             			'serverUid'
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
