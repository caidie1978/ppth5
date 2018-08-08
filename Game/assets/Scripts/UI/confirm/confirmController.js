var UIConfig = require("UIConfig");
var IController = require("IController");
var eventDispatch = require("eventDispatch");
var EventID = require("EventID");
var Facade = require("Facade");

var lobbyController = cc.Class({
    extends:IController,

    properties: {
        curType : 2,
        callbackConfirm : null,
        textvalue:"",
    },

    init:function(){
        this._super();
    },

    register:function()
    {
        eventDispatch.register(EventID.OpenConfirm, this.OpenConfirm);
        eventDispatch.register(EventID.OnConfirmClkOk, this.OnConfirm);
        eventDispatch.register(EventID.OnConfirmClkCancel, this.OnCancel);
    },

    OpenConfirm:function(param)
    {
        this.curType = param.showType;
        this.textvalue = param.textvalue;
        this.callbackConfirm = param.callbackConfirm;
    
        var info = UIConfig.confirmUI;
        var self = this;
        cc.log(this.textvalue);
        Facade.uiMgr.open(info.Path, (obj)=>{
            var confirmView = require("confirmView");
            obj.getComponent(confirmView).oninit(self.curType, self.textvalue);
            cc.log(self.textvalue);
        });
    },
    
    OnConfirm:function(){
        if (this.callbackConfirm != null){
            this.callbackConfirm();
        }
    },

    OnCancel:function(){
        Facade.uiMgr.close("confirmUI");
    },
});

module.exports = lobbyController;


