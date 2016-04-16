Ext.chart.Chart.CHART_URL = '../extjs/resources/charts.swf'; // 模板flash
title = '平台违规年统计表';
Ext.onReady(function() {
    Ext.QuickTips.init();

    var tb = new Ext.Toolbar({
        width : 720,
        height : 30,
        items : ['年：', {
            id : 'reportYear',
            xtype : 'textfield',
            name : 'year',
            emptyText : '点击输入年'
        },  {
            xtype : 'tbspacer',
            width : 10
        }, {
            // xtype: 'button',
            text : '统计',
            listeners : {
                "click" : function() {

                    var reportYear = Ext.fly("reportYear").dom.value;
                    if (reportYear == '点击输入年' || reportYear == '') {
                        Ext.Msg.alert("提示", "请输入年份！");
                        return;
                    }
                    var time= reportYear+ "年的违规次数";
                    Ext.getCmp("chart1").setTitle().clear;
                    Ext.getCmp("chart2").setTitle().clear;
                    Ext.getCmp("chart1").setTitle(time);
                    Ext.getCmp("chart2").setTitle(time);
                    store.setBaseParam("year", reportYear);
                    store.load();
                    chartStore1.setBaseParam("year", reportYear);
                    chartStore1.load();
                    chartStore2.setBaseParam("year", reportYear);
                    chartStore2.load();
                    /*store.load({
                        params : {
                            start : 0,
                            limit : PAGESIZE
                        }
                    });*/

                }
            }
        }]
    });

    var proxy = new Ext.data.HttpProxy({
        url:"../sysAbnormalService.do?m=selectYearForAbnormal",
        timeout: 20*60*1000
    });
    var record = new Ext.data.Record.create([
//        {name:'idsystemname', mapping:'idsystemname'} ,
//        {name:'idsystem', mapping:'idsystem'} ,
//        {name:'username', mapping:'username'} ,
//        {name:'sysabnormalobjecttype', mapping:'sysabnormalobjecttype'} ,
        {name:'SeparationViolations', mapping:'SeparationViolations'} ,
        {name:'OtherViolations', mapping:'OtherViolations'},
        {name:'NetworkViolations', mapping:'NetworkViolations'},
        {name:'ProcessViolations', mapping:'ProcessViolations'},
        {name:'PeripheralViolations', mapping:'PeripheralViolations'},
        {name:'URLViolations', mapping:'URLViolations'},
        {name:'FluxViolations', mapping:'FluxViolations'}

    ]);
    var reader = new Ext.data.JsonReader({
        totalProperty:"totalCount",
        root:"rows"//,
//        id:'id'
    }, record);
    var store = new Ext.data.GroupingStore({
        id:"store.info",
        proxy:proxy,
        reader:reader
    });
    store.load();
    // create the Data Store

    var rowNumber = new Ext.grid.RowNumberer();         //自动 编号

    var colM = new Ext.grid.ColumnModel([
//        boxM,
        rowNumber,
        {header:"网络违规", dataIndex:"NetworkViolations", sortable:true, menuDisabled:true} ,
        {header:"进程违规", dataIndex:"ProcessViolations", sortable:true, menuDisabled:true} ,
        {header:"外设违规", dataIndex:"PeripheralViolations", sortable:true, menuDisabled:true} ,
        {header:"URL违规", dataIndex:"URLViolations", sortable:true, menuDisabled:true} ,
        {header:"流量违规", dataIndex:"FluxViolations", sortable:true, menuDisabled:true} ,
        {header:"机卡分离违规", dataIndex:"SeparationViolations", sortable:true, menuDisabled:true} ,
        {header:"其他违规", dataIndex:"OtherViolations", sortable:true, menuDisabled:true}
    ]);
    // store.setDefaultSort('lastpost', 'desc');
    var grid = new Ext.grid.GridPanel({
        width : "100%",
        height : "300",
        renderTo : 'topic-grid',
        layout : 'fit',
        // autoHeight:true,
        title : title,
        store : store,
        loadMask : true,
        trackMouseOver : true,// 鼠标悬浮高亮显示
        // autoExpandColumn: 'auditInfo',// 自动扩展宽度适应空白部分
        columnLines : true,// 列分隔符
        cm:colM,

        sm : new Ext.grid.RowSelectionModel({
            singleSelect : true
        }),

        // paging bar on the bottom
//        bbar : new Ext.ux.PagingToolbar({
//            id : 'mypagebar',
//            store : store
//        })   ,
        tbar : tb
    });



    var chartStore1 = new Ext.data.JsonStore({
        url : '../sysAbnormalService.do?m=selectAbnormalYear',
        root : 'rows',
        fields : [ 'abnormalName',  'abnormalCount','abnormalCode']
    });

    var chart1 = new Ext.Panel({
        id:'chart1',
        iconCls : 'chart',
        title : '违规次数',
        frame : true,
        renderTo : 'report-chart1',
        width : "100%",
        height : 300,
        layout : 'fit',

        items : {
            xtype : 'columnchart',
            store : chartStore1,
            url : '../js/ext/resources/charts.swf',
            xField : 'abnormalName',
            yField : 'abnormalCount',
            yAxis : new Ext.chart.NumericAxis({
                displayName : '违规次数',
                labelRenderer : Ext.util.Format.numberRenderer('0,0')
            }),
            tipRenderer : function(chart, record) {
                return record.data.abnormalName + ' 违规次数： '
                    + Ext.util.Format.number(record.data.abnormalCount, '0,0');
            }
        }
    });
    chartStore1.load();
    var chartStore2 = new Ext.data.JsonStore({
        url : '../sysAbnormalService.do?m=selectLineChartYear',
        root : 'rows',
        fields : ['time','type1', 'type2', 'type3', 'type4', 'type5', 'type6', 'type7']
    });
    var chart2 = new Ext.Panel({
        id:'chart2',
        iconCls : 'chart',
        title : '违规次数',
        frame : true,
        renderTo : 'report-chart2',
        width : "100%",
        height : 300,
        layout : 'fit',

        items : {
            xtype : 'linechart',
            store : chartStore2,
            url : '../js/ext/resources/charts.swf',
            xField : 'time',
//            yField : 'abnormalCount',   visits
            yAxis : new Ext.chart.NumericAxis({
                displayName : '违规次数',
                labelRenderer : Ext.util.Format.numberRenderer('0,0')
            }),

            extraStyle: {
                legend: {
                    display: 'top',
                    font: {
                        name: 'Tahoma',
                        color: 0x15428B,
                        size: 10,
                        bold: true
                    }

                }
            },
            series: [{
                type: 'line',
                displayName: '其他违规',
                yField: 'type1',
                style: {
//                    image:'bar.gif',
//                    mode: 'stretch',
                    color:0x99BBE8
                }
            },{
                type:'line',
                displayName: '网络违规',
                yField: 'type2',
                style: {
//                    image:'bar.gif',
//                    mode: 'stretch',
                    color: 0xffff00
                }
            },{
                type:'line',
                displayName: '进程违规',
                yField: 'type3',
                style: {
//                    image:'bar.gif',
//                    mode: 'stretch',
                    color: 0x0000ff
                }
            },{
                type:'line',
                displayName: '外设违规',
                yField: 'type4',
                style: {
//                    image:'bar.gif',
//                    mode: 'stretch',
                    color: 0x0c0c0c
                }
            },{
                type:'line',
                displayName: 'URL违规',
                yField: 'type5',
                style: {
//                    image:'bar.gif',
//                    mode: 'stretch',
                    color: 0xff0000
                }
            },{
                type:'line',
                displayName: '流量违规',
                yField: 'type6',
                style: {
//                    image:'bar.gif',
//                    mode: 'stretch',
                    color: 0x800080
                }
            },{
                type:'line',
                displayName: '机卡分离违规',
                yField: 'type7',
                style: {
//                    image:'bar.gif',
//                    mode: 'stretch',
                    color: 0x00ffff
                }
            }]
        }
    });
    chartStore2.load();

});
