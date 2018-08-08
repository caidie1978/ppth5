/************************************************************************************
    UI管理器
    @author wy
 ************************************************************************************/

 var Map = require("Map");

cc.Class({
    extends: cc.Component,

    //name:"UIManager",

    properties:{
        uiroot:{
            default:null,
            serializable: false,
            type:cc.Node
        },

        AllUIObj:
        {
            serializable:false,
            default:null,
            type:Map
        }
    },
     
    onEnable:function()
    {
        cc.log("==========onEnable 启动");
    },
    
    onLoad:function(){
        cc.log("UIManager 管理器添加成功");
        cc.game.addPersistRootNode(this.node);
        this.AllUIObj = new Map();

        this.uiroot = cc.find("Canvas", cc.node);
        cc.game.addPersistRootNode(this.uiroot);
    },

    start:function(){
        
    },

    open:function(uiName, fcallback = null){
        // 加载UI资源
        var index = uiName.lastIndexOf('/');
        var tempName = uiName.substr(index+1);

        cc.log("加载UI== "+tempName);

        // 如果UI缓存已经存在了，就直接显示UI，否在再去加载UI
        var isExist = this.AllUIObj.contains(tempName);
        if (isExist)
        {
            var uiObj = this.AllUIObj.get(tempName);
            uiObj.active = true;

            if (fcallback != null){
                fcallback(uiObj);
            }
        }
        else
        {
            var self = this;
            cc.loader.loadRes(uiName, function(err, prefab){

                if (err)
                {
                    cc.error("Load UI Error info = ".err);
                    return;
                }
                var uiObj = cc.instantiate(prefab);
                // 设置UI节点
                var parent = cc.find("Canvas", cc.node);
        
                self.uiroot.addChild(uiObj);
        
                cc.log("缓存到容器中="+uiObj.name);
                // 添加到缓存中
                self.AllUIObj.put(uiObj.name, uiObj);

                if (fcallback != null){
                    fcallback(uiObj);
                }
            });
        }

    },

    // 关闭某个UI
    // 先不销毁UI，只是隐藏
    close:function(uiName){
        var isExist = this.AllUIObj.contains(uiName);
        if (isExist)
        {
            var uiObj = this.AllUIObj.get(uiName);
            
            uiObj.active = false;

            uiObj.destroy();
        }
    },

    // 移除某个UI
    remove:function(uiName){
        var isExist = this.AllUIObj.contains(uiName);
        if (isExist)
        {
            this.AllUIObj.remove(uiName);   
        }
    },

    setRoot:function(){
    },

    // update (dt) {},
    clear : function(){
        this.AllUIObj.clear();
    }
});

//module.exports = UIManager;
