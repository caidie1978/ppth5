/****************************************************************************************
 * 
 * 
 ************************************************************************************/
var UIConfig = require("UIConfig");
var IController = require("IController");
var eventDispatch = require("eventDispatch");
var EventID = require("EventID");
var Facade = require("Facade");
var lobbyModel = require("lobbyModel");
var defstruct = require("DefStruct");
var gd = require("GlobalData");

var lobbyController = cc.Class({
    extends:IController,

    properties:{
        lobbyMd:{
            default:null,
            serializable: false,
            type:lobbyModel
        }        
    },

    init:function(){
        this._super();

        this.lobbyMd = new lobbyModel();
    },

    register:function()
    {
        eventDispatch.register(EventID.LobbySceneInit, this.Oninit.bind(this));
        eventDispatch.register(EventID.OnSignRandomBattle, this.OnSignRandomBattle.bind(this));
    },

    Oninit:function(obj, param)
    {
        // 加载UI

        var info = UIConfig.lobbyUI;

        cc.log("配置文件 = "+info);
        Facade.uiMgr.open(info.Path, ((obj)=>{
            // 这里初始化MatchVS，以便失败后提示UI能正常显示
            this.initMatchVS();
        }).bind(this));

        
    },

    initMatchVS:function(){
        if (Facade.mvsMgr.isInit()){
            return;
        }

        this.send(EventID.OpenConfirm, {
            showType : defstruct.ConfirmUIType.OnlyText,
            textvalue : "连接服务器。。。",
        });


        Facade.mvsMgr.init(this.onInitResponse.bind(this));
        var mvsOnMsg = require("MatchVSMsgProcess");
        Facade.mvsMgr.setResponseClass(mvsOnMsg);
    },

    onInitResponse : function(state, errorInfo){
        if (state == 1){
            this.send(EventID.OpenConfirm, {
                showType : defstruct.ConfirmUIType.OnlyText,
                textvalue : "初始化成功",
            });
        } else if (state == 2){
            //cc.log("断线重连，进入房间成功");
            this.send(EventID.OpenConfirm, {
                showType : defstruct.ConfirmUIType.OnlyText,
                textvalue : "初始化成功",
            });
        } else if (state == 1){
            //cc.log("初始化失败" + errorInfo);
            this.send(EventID.OpenConfirm, {
                showType : defstruct.ConfirmUIType.OnlyText,
                textvalue : "初始化失败：" + errorInfo,
            });
        }

        var self = this;
        if (state == 1 || state == 2){
            setTimeout(() => {
                self.send(EventID.OnConfirmClkCancel);
            }, 500);

            gd.mvsUserID = Facade.mvsMgr.getMyUserID();
        }
    },

    OnSignRandomBattle : function(){
        // 玩家报名数据
        var signData = defstruct.create
        // 单人报名
        Facade.mvsMgr.joinSingleBattleRoom();
    }
});

module.exports = lobbyController;


