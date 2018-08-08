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
var eventDispatch = require("eventDispatch");
var defstruct = require("DefStruct");
cc.Class({
    extends: IView,

    properties: {
        // 关闭
        closeBtn:cc.Node,
        confirmBtn:cc.Node,
        confirmBtnEx:cc.Node,
        cancelBtn:cc.Node,
        titleLabel:{
            default:null,
            type:cc.Label
        }

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad:function () {
        var self = this;
        this.closeBtn.on(cc.Node.EventType.TOUCH_END, function(event){
            self.send(EventID.OnConfirmClkCancel);
        });

        this.confirmBtn.on(cc.Node.EventType.TOUCH_END, function(event){
            self.send(EventID.OnConfirmClkOk);
        });

        this.confirmBtnEx.on(cc.Node.EventType.TOUCH_END, function(event){
            self.send(EventID.OnConfirmClkOk);
        });

        this.cancelBtn.on(cc.Node.EventType.TOUCH_END, function(event){
            self.send(EventID.OnConfirmClkCancel);
        });
    },

    oninit:function(showType, strContent){
        this.titleLabel.string = strContent;

        if (showType == defstruct.ConfirmUIType.OnlyText){
            this.closeBtn.active = false;
            this.confirmBtn.active = false;
            this.confirmBtnEx.active = false;
            this.cancelBtn.active = false;
        }else if (showType == defstruct.ConfirmUIType.All){
            this.closeBtn.active = true;
            this.confirmBtn.active = true;
            this.confirmBtnEx.active = false;
            this.cancelBtn.active = true;
        }
        else if (showType == defstruct.ConfirmUIType.OnlyConfirm){
            this.closeBtn.active = true;
            this.confirmBtn.active = false;
            this.confirmBtnEx.active = true;
            this.cancelBtn.active = false;
        }
    },
    // update (dt) {},
});
