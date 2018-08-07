/****************************************************
 Framework.IView
 @author wy
 ***************************************************/

var eventDispatch = require("eventDispatch");
var Facade = require("Facade");

var IView = cc.Class({
    extends: cc.Component,
    // 发送消息处理
    send:function(key, obj){
        eventDispatch.instance.send(key, obj);
    },

    // 当UI被销毁的时候调用
    onDestroy:function(){
        cc.log("获取预设名称" + this.node.name);
        Facade.instance.uiMgr.remove(this.node.name);
    },

 });

 module.exports = IView;
