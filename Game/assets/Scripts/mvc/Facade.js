/****************************************************************
 Facade
 @author wy
 ***************************************************************/

var eventDispatch = require("eventDispatch");
var sceneController = require("sceneController");
var lobbyController = require("lobbyController");
var confirmController = require("confirmController");
var Map = require("Map");

export var Facade = (function(){
     var unique;
     unique = new _Facade();

     return unique;
 })();

function _Facade(){
    cc.log("Facade init.");
}

Facade._directorMediator = null;

Facade._modelMap = null;

// 管理器
Facade.uiMgr = null;
Facade.resMgr = null;
Facade.poolMgr = null;
Facade.mvsMgr = null;

/**
 * Init Framework
 */
Facade.init = function(){
    // 初始化消息订阅
    eventDispatch.init();
    Facade._modelMap = new Map();
    // 注册下游戏模块
    Facade.registerModel("sceneController", new sceneController());
    Facade.registerModel("lobbyController", new lobbyController());
    Facade.registerModel("confirmController", new confirmController());
    //var scenectl = new sceneController();
    //scenectl.init();
    
    //var lobbyctl = new lobbyController();
    //lobbyctl.init();
}

Facade.registerModel = function(cls, model){
    model.init();
    var isExist = Facade._modelMap.contains(cls);
    if (isExist){
        cc.log("Model:" + cls + "have already exists1");
    }else{
        Facade._modelMap.put(cls, model);
    }
}

module.exports = Facade;