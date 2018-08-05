
/**************************************************************
IController 
@author wy
 *************************************************************/
import { Facade } from "../Facade";

var eventDispatch = require("eventDispatch");

var IController = cc.Class({
    
    ctor:function(){
        
    },

    // 初始化
    init:function(){
        this.register();
        cc.log("Sub Class is Init");
    },
    // 注册一个事件监听
    register:function(){

    },

    // 移除事件监听
    remove:function(eventName, eventHandler){

    },

    // 移除所有的监听事件
    removeAll:function(eventName){
        
    },

    send:function(key, obj){
        eventDispatch.send(key, obj);
    },

    // 获取Model
    getModel:function(cls){
        return Facade._modelMap.get(cls);
    }
 });

 module.exports = IController;