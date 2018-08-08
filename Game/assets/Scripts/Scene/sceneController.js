/****************************************************************************
 * 场景控制
 ****************************************************************************/
var IController = require("IController");
var eventDispatch = require("eventDispatch");
var EventID = require("EventID");
var Facade = require("Facade");

var sceneController = cc.Class({
    extends:IController,

    rootManager:cc.Node,

    init:function(){
        this._super();
    },

    // 注册一个事件监听
    register:function(){

        eventDispatch.register(EventID.GameInit, this.initGame, this);
        eventDispatch.register(EventID.ReturToLobby, this.loadLobbyScene);
        eventDispatch.register(EventID.StartRandomBattle, this.StartRandomBattle, this);
        eventDispatch.register(EventID.StartTeamBattle, this.StartTeamBattle, this);
    },

    initGame:function(obj, callbackObj){

        callbackObj.rootManager = cc.find("Manager");
        
        Facade.resMgr = callbackObj.rootManager.getComponent("resManager");
        Facade.uiMgr = callbackObj.rootManager.getComponent("UIManager");
        Facade.tabMgr = callbackObj.rootManager.getComponent("TableManager");
        Facade.poolMgr = callbackObj.rootManager.getComponent("PoolManager");

        Facade.mvsMgr = require("../MatchVS/MatchVSMgr").mvsMgr;
        
        cc.log("初始化，开始调用场景加载");

        callbackObj.loadLobbyScene();
    },


    // 切换到战斗场景
    StartRandomBattle:function(obj, callbackObj){
        // 可以随机一个场景， 加载场景开始战斗，加载战斗ui
        Facade.resMgr.loadScene("Scenes/battle", function(){
            // 设置节点
            Facade.uiMgr.setRoot();

            // 发送指令,lobbyconrtroller加载UI
            eventDispatch.send(EventID.LobbySceneInit);

        });
    },

    // 组队战斗场景
    StartTeamBattle:function(obj, callbackObj){
        Facade.resMgr.loadScene("Scenes/battle", function(){
            // 设置节点
            Facade.uiMgr.setRoot();

            // 发送指令,lobbyconrtroller加载UI
            eventDispatch.send(EventID.LobbySceneInit);

        });
    },

    // 切换到游戏大厅
    loadLobbyScene:function(obj, callbackObj){
        // 发送指令
        Facade.resMgr.loadScene("Scenes/lobby", function(){
            // 设置节点
            //var sceneNode = cc.director.getScene();

            //Facade.uiMgr.uiroot = sceneNode.getChildByName("Canvas");

            Facade.uiMgr.setRoot();

            // 发送指令,lobbyconrtroller加载UI
            eventDispatch.send(EventID.LobbySceneInit);

        });
    }


});

module.exports = sceneController;