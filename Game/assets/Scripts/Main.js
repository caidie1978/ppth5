
var eventDispatch = require("eventDispatch");
var EventID = require("EventID");
var Facade = require("Facade");
// 先由这里来启动游戏，加载表格数据之类的，在启动游戏大厅

cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.addPersistRootNode(this.node);

        Facade.init();
    },

    start () {
        cc.log("场景启动，发送消息");
        eventDispatch.send(EventID.GameInit);
    },

    // update (dt) {},
});
