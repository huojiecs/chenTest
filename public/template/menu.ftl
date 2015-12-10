 {
			"expanded": true,
                "children": [
                {
        
                    "text": "角色管理",
                    "children": [
                        {
                            "id": "queryAccountInfo",
                            "text": "账号查询",
                            "leaf": true
                        },
                        {
                            "id": "queryRoleList",
                            "text": "角色查询",
                            "leaf": true
                        },
                        {
                            "id": "banRole",
                            "text": "封号",
                            "leaf": true
                        }
                    ]
                },
                {
                            "text": "玩家信息管理",
                            "children": [
                                {
                                    "id": "queryUserInfo",
                                    "text": "个人信息查询",
                                    "leaf": true
                                },
                                {
                                    "id": "queryAssetInfo",
                                    "text": "财产查询",
                                    "leaf": true
                                },
                                {
                                    "id": "queryEquip",
                                    "text": "装备查询",
                                    "leaf": true
                                },
                                {
                                    "id": "updateExp",
                                    "text": "修改经验",
                                    "leaf": true
                                },
                                {
                                    "id": "updateLevel",
                                    "text": "修改等级",
                                    "leaf": true
                                },
                                {
                                    "id": "updateVipLevel",
                                    "text": "修改Vip等级",
                                    "leaf": true
                                },
                                {
                                    "id": "updatePhysical",
                                    "text": "修改体力",
                                    "leaf": true
                                }
                            ]
                        },
                        {
                
                            "text": "邮件管理",
                            "children": [
                                {
                                    "id": "sendUserMail",
                                    "text": "个人邮件",
                                    "leaf": true
                                },
                                {
                                    "id": "sendSystemMail",
                                    "text": "系统邮件",
                                    "leaf": true
                                }
                            ]
                },
                {

                    "text": "玩家数据管理",
                    "children": [
                    <#list struts as record>
                        {
                            "id": "${record.name?if_exists}",
                            "text": "${record.desc?if_exists}",
                            "leaf": true
                        }
                        <#if (struts?size - 1 != record_index) >
                        ,
                        </#if>
                    </#list>                    
                    ]
                },
                {
                
                            "text": "公告管理",
                            "children": [
                                {
                                    "id": "sendSystemNotice",
                                    "text": "系统公告",
                                    "leaf": true
                                },
                                {
                                    "id": "sendSystemMail",
                                    "text": "系统邮件",
                                    "leaf": true
                                }
                            ]
                        },
                        {
                            "text": "系统管理",
                            "children": [
                                {
                                    "id": "scripts",
                                    "text": "Scripts",
                                    "leaf": true
                                },
                                {
                                    "id": "nodeInfo",
                                    "text": "nodeInfo",
                                    "leaf": true
                                },
                                {
                                    "id": "rpcDebug",
                                    "text": "RPC Debug",
                                    "leaf": true
                                }
                            ]
                        }
                
                    ]
}