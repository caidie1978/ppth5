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
        eventDispatch.register(EventID.LobbySceneInit, this.Oninit);
    },

    Oninit:function(obj, param)
    {
        // 加载UI

        var info = UIConfig.lobbyUI;

        cc.log("配置文件 = "+info);
        Facade.uiMgr.open(info.Path);
    }
});

module.exports = lobbyController;


