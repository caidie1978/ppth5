
const eventDispatch = require("eventDispatch");
const EventID = require("EventID");
const Facade = require("Facade");
// 先由这里来启动游戏，加载表格数据之类的，在启动游戏大厅

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.addPersistRootNode(this.node);
    
        Facade.instance.init();
    },

    start () {
        
        cc.log("场景启动，发送消息");
        eventDispatch.instance.send(EventID.GameInit);
    },

    // update (dt) {},
});
