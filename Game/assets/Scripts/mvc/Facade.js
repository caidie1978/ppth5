/****************************************************************
 Facade
 @author wy
 ***************************************************************/

var eventDispatch = require("eventDispatch");
var sceneController = require("sceneController");
var lobbyController = require("lobbyController");
var battleController = require("battleController");
var confirmController = require("confirmController");
var Map = require("Map");

var Facade = cc.Class({

    statics:{
        instance:null
    },

    properties:{
        modelMap:
        {
            serializable:false,
            default:null,
            type:Map
        },

        uiMgr:{
            serializable:false,
            default:null,
            type:cc.Node
        },
        resMgr:{
            serializable:false,
            default:null,
            type:cc.Node
        },
        
        poolMgr:{
            serializable:false,
            default:null,
            type:cc.Node
        },
        
        tabMgr:{
            serializable:false,
            default:null,
            type:cc.Node
        },

        mvsMgr: null,
    },

    registerModel:function(cls, model){
        model.init();
        var isExist = this.modelMap.contains(cls);
        if (isExist){
            cc.log("Model:" + cls + "have already exists1");
        }else{
            this.modelMap.put(cls, model);
        }
    },
    
    getController:function(cls){
        var isExist = this.modelMap.contains(cls);
        if (isExist){
            return this.modelMap.get(cls);
        }else{
            return null;
        }
    },

    init:function(){
        // 初始化消息订阅
        eventDispatch.instance.init();
        this.modelMap = new Map();
        // 注册下游戏模块
        this.registerModel("sceneController", new sceneController());
        this.registerModel("lobbyController", new lobbyController());
        this.registerModel("confirmController", new confirmController());
        this.registerModel("battleController", new battleController());
        
        var rootManager = cc.find("Manager");

        this.resMgr = rootManager.getComponent("resManager");
        this.uiMgr = rootManager.getComponent("UIManager");
        this.tabMgr = rootManager.getComponent("TableManager");
        this.poolMgr = rootManager.getComponent("PoolManager");
        this.mvsMgr = require("../MatchVS/MatchVSMgr").mvsMgr;
        
    },
    
});

Facade.instance = new Facade();

module.exports = Facade;