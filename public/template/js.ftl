
Ext.onReady(function () {

    Ext.BLANK_IMAGE_URL = '../ext-4.2.1-gpl/resources/themes/images/default/tree/s.gif';


    var sceneStore = Ext.create('Ext.data.Store', {
        id: 'sceneStoreId',
        autoLoad: false,
        pageSize: 5,
		fields: [
		<#list model.entry as record>
			'${record.name?if_exists}'<#if (model.entry?size - 1 != record_index) >, </#if>
		</#list>
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
			<#list model.entry as record>
				{text: '${record.desc?if_exists}', dataIndex: '${record.name?if_exists}', width: 120}
				<#if (model.entry?size - 1 != record_index) >
				,
				</#if>
			</#list>
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
			<#list items as record>
                     <#if ('${record.xtype}' == 'combo') >
                        {
                            xtype: '${record.xtype}',
                            fieldLabel: '${record.desc?if_exists}',
                            name: '${record.name?if_exists}',
                            displayField: 'desc',
                            valueField: 'value',
                            store:new Ext.data.Store({
                                           
                                           fields: ['desc', 'value'],
                                           data : [
                                               <#list record.values as res>
                                                        {"desc":"${res.desc}", "value":"${res.value}"}
                                                       <#if (record.values?size - 1 != res_index) >
                                                        ,
                                                        </#if>
                                               </#list>
                            ]}),
                            emptyText:'请选择',
                            blankText : '请选择',
                            editable :false
                        }
                     <#elseif ('${record.xtype}' == 'datetimefield')>
                          {
                              xtype: '${record.xtype?if_exists}',
                              fieldLabel: '${record.desc?if_exists}',
                              format:'Y-m-d H:m:s',
                              allowBlank : false,
                              blankText:"不能为空",
                              name: '${record.name?if_exists}'
                          }  
                     <#else>
                         {
                            xtype: '${record.xtype?if_exists}',
                            fieldLabel: '${record.desc?if_exists}',
                            name: '${record.name?if_exists}'
                         }
                     </#if>
                     <#if (items?size - 1 != record_index) >
                        ,
                     </#if>
			</#list>
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
            params:{'tableName':'${model.name}',
            		'paramStr': <#list items as record> 
                                '${record.name?if_exists} = '+query_form.getForm().getValues()['${record.name?if_exists}'] <#if (items?size - 1 != record_index) > +' and ' + <#else>, </#if>
                               </#list>
            'fields': [
                                                                             		<#list model.entry as record>
                                                                             			'${record.name?if_exists}'<#if (model.entry?size - 1 != record_index) >, </#if>
                                                                             		</#list>
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
