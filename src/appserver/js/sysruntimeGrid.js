/*
 * ! Ext JS Library 3.2.0 Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com http://www.extjs.com/license
 */
url = '../sysruntime.do?m=index';
title = '本级系统状态查询';
Ext.onReady(function() {
	Ext.QuickTips.init();
	var tb = new Ext.Toolbar({
		width : 720,
		height : 30,
		items : ['上报日期晚于：', {
			id : 'startDate',
			xtype : 'datefield',
			name : 'startDate',
			emptyText : '点击输入日期',
			format : 'Y-m-d'   ,
            editable:false
		}, {
			xtype : 'tbspacer',
			width : 10
		}, '早于：', // same as {xtype: 'tbtext', text: 'text1'} to create
					// Ext.Toolbar.TextItem
				{
					id : 'endDate',
					xtype : 'datefield',
					name : 'endDate',
					emptyText : '点击输入日期',
					format : 'Y-m-d' ,
                    editable:false
				}, {
					xtype : 'tbspacer',
					width : 10
				}, {
					// xtype: 'button',
					text : '查询',
					listeners : {
						"click" : function() {
							var startDate = Ext.fly("startDate").dom.value == '点击输入日期'
									? ''
									: Ext.fly("startDate").dom.value;
							var endDate = Ext.fly("endDate").dom.value == '点击输入日期'
									? ''
									: Ext.fly("endDate").dom.value;
							store.setBaseParam("startDate", startDate);
							store.setBaseParam("endDate", endDate);
							store.load({
								params : {
									start : 0,
									limit : PAGESIZE
								}
							});

						}
					}
				}]
	});

	// create the Data Store
	var store = new Ext.data.JsonStore({
		url : url,
		root : 'results',
		totalProperty : 'amount',
		idProperty : 'id',
		// remoteSort: true,

		fields : [{
			name : 'id',
			mapping : 'id'
		}, {
			name : 'startTime',
			mapping : 'startTime'
		}, {
			name : 'endTime',
			mapping : 'endTime'
		}, {
			name : 'writeTime',
			mapping : 'writeTime'
		}, {
			name : 'idSystem',
			mapping : 'idSystem'
		}, {
			name : 'runStateCode',
			mapping : 'runStateCode'
		}, {
			name : 'desc',
			mapping : 'desc'
		}]

	});
	// store.setDefaultSort('lastpost', 'desc');
    store.load({
        params : {
            start : 0,
            limit : PAGESIZE
        }
    });
	var grid = new Ext.grid.GridPanel({
		title : title,
		store : store,
		loadMask : true,
		trackMouseOver : true,// 鼠标悬浮高亮显示
		// autoExpandColumn: 'auditInfo',// 自动扩展宽度适应空白部分
		columnLines : true,// 列分隔符

		// grid columns
		columns : [{
			id : 'topic', // id assigned so we can apply custom css (e.g.
							// .x-grid-col-topic b { color:#333 })
			header : "状态开始时间",
			dataIndex : 'startTime',
			width : 150,
			menuDisabled : true,
			sortable : true
		},{
			id : 'topic', 
			header : "状态结束时间",
			dataIndex : 'endTime',
			width : 150,
			menuDisabled : true,
			sortable : true
		},{
			id : 'topic',
			header : "记录时间",
			dataIndex : 'writeTime',
			width : 150,
			menuDisabled : true,
			sortable : true
		}, {
			header : "系统标识",
			dataIndex : 'idSystem',
			width : 100,
			menuDisabled : true
		}, {
			header : "运行状态",
			dataIndex : 'runStateCode',
			width : 100,
			menuDisabled : true
		}, {
			header : "状态说明",
			dataIndex : 'desc',
			width : 300,
			menuDisabled : true
		}],
		sm : new Ext.grid.RowSelectionModel({
			singleSelect : true
		}),

		// paging bar on the bottom
		bbar : new Ext.ux.PagingToolbar({
			store : store
		}),
		tbar : tb,
		viewConfig : {}
	});
	// render it
	grid.render('topic-grid');

	// trigger the data store load
	// store.load({params:{start:0, limit:PAGESIZE}});
	var viewport = new Ext.Viewport({
		layout : 'fit',
		border : false,
		items : [grid]
	});
});
