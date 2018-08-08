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
        eventDispatch.instance.register(EventID.OpenConfirm, this.OpenConfirm);
        eventDispatch.instance.register(EventID.OnConfirmClkOk, this.OnConfirm);
        eventDispatch.instance.register(EventID.OnConfirmClkCancel, this.OnCancel);
    },

    OpenConfirm:function(param)
    {
        var Facade = require("Facade");

        this.curType = param.showType;
        this.textvalue = param.textvalue;
        this.callbackConfirm = param.callbackConfirm;
    
        var info = UIConfig.confirmUI;
        var self = this;
        cc.log(this.textvalue);
        Facade.instance.uiMgr.open(info.Path, (obj)=>{
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
        var Facade = require("Facade");
        Facade.instance.uiMgr.close("confirmUI");
    },
});

module.exports = lobbyController;


