/************************************************************
表格数据加载
 ************************************************************/
var Map = require("Map");
var TableName = require("TableName");
var HeroTable = require("HeroTable");
var ItemTable = require("ItemTable");
var BaseConfigTable = require("BaseConfigTable");
var EffectTable = require("EffectTable");

var tableManager = cc.Class({
    extends: cc.Component,

    properties:{

        TableDic:
        {
            serializable:false,
            default:null,
            type:Map
        }
    },

    onLoad:function(){
       this.TableDic = new Map();
    },

    start:function(){
        this.init();
    },

    // 表格初始化
    init:function(){
        
        this.TableDic.put(TableName.HeroTable, HeroTable);
        this.TableDic.put(TableName.ItemTable, ItemTable);
    },
    
    // 加载表格
    loadTable:function(path){
        var url = cc.url.raw(path)
        cc.loader.loadRes( url, function( err, res)
        {
            //TODO wy 这里解析读取的表格数据存储到本地 
        });
    },

    // 通过名称获取表格
    getTable:function(tableName){

        return this.TableDic.get(tableName);
    },

    getTableData:function(tableName, dataName){
        // 获取表格
        var table = this.TableDic.get(tableName);

        return table[dataName];
    }


});

//module.exports = tableManager;