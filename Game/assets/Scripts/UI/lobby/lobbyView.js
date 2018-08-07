// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var IView = require("IView");
var EventID = require("EventID");
var Facade = require("Facade");

cc.Class({
    extends: IView,

    properties: {
        // 个人快速战斗按钮
        quickBattleBtn:cc.Node,
        // 组队战斗按钮
        teamBattleBtn:cc.Node,
        // 商店按钮
        shopBtn:cc.Node,
        // 任务按钮
        taskBtn:cc.Node,
        // 排行榜按钮
        tiolistBtn:cc.Node,
        // 帮助按钮
        helpBtn:cc.Node,
        // 头像
        head:{
            default:null,
            type:cc.Sprite
        },

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        // 个人匹配
        var self = this;
        this.quickBattleBtn.on(cc.Node.EventType.TOUCH_END, function(event){
            cc.log("点击随机匹配");
            // TODO 发送事件到controller,这里不做处理
            self.send(EventID.StartRandomBattle);

            Facade.instance.uiMgr.close(self.node.name);
        });

        // 组队匹配
        this.teamBattleBtn.on(cc.Node.EventType.TOUCH_END, function(event){
            cc.log("组队匹配");
            //
            self.send(EventID.StartTeamBattle);
        });


    },

    start () {

    },

    // update (dt) {},
});
