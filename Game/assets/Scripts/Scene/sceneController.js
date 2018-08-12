/****************************************************************************
 * 场景控制
 ****************************************************************************/
var IController = require("IController");
var eventDispatch = require("eventDispatch");
var EventID = require("EventID");
var Facade = require("Facade");

var sceneController = cc.Class({
    extends:IController,

    properties:{
        rootManager:cc.Node,
    },

    init:function(){
        this._super();
    },

    // 注册一个事件监听
    register:function(){

        eventDispatch.instance.register(EventID.GameInit, this.initGame, this);
        eventDispatch.instance.register(EventID.ReturToLobby, this.loadLobbyScene, this);
        eventDispatch.instance.register(EventID.StartRandomBattle, this.StartRandomBattle, this);
        eventDispatch.instance.register(EventID.StartTeamBattle, this.StartTeamBattle, this);
    },

    initGame:function(obj, callbackObj){

        cc.log("初始化，开始调用场景加载");

        callbackObj.loadLobbyScene();
    },


    // 切换到战斗场景
    StartRandomBattle:function(obj, callbackObj){
        var Facade = require("Facade");
        // 可以随机一个场景， 加载场景开始战斗，加载战斗ui
        Facade.instance.resMgr.loadScene("Scenes/battle", function(){
            // 发送指令,lobbyconrtroller加载UI
            eventDispatch.instance.send(EventID.BattleSceneInit);
           
           //var controll = Facade.instance.getController("battleController");

           //controll.Oninit();
        });
    },

    // 组队战斗场景
    StartTeamBattle:function(obj, callbackObj){
        var Facade = require("Facade");
        Facade.instance.resMgr.loadScene("Scenes/battle", function(){
            // 发送指令,lobbyconrtroller加载UI
            eventDispatch.instance.send(EventID.BattleSceneInit);

        });
    },

    // 切换到游戏大厅
    loadLobbyScene:function(obj, callbackObj){
        // 发送指令
        var Facade = require("Facade");
        //Facade.resMgr.loadScene(
        Facade.instance.resMgr.loadScene("Scenes/lobby", function(){
            // 发送指令,lobbyconrtroller加载UI
            eventDispatch.instance.send(EventID.LobbySceneInit);

            //var controll = Facade.instance.getController("lobbyController");

            //controll.Oninit();
        });
    }


});

module.exports = sceneController;