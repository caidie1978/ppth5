// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var resManager = cc.Class({
    extends: cc.Component,
    
    editor: {
        executionOrder: -1
    },

    statics:
    {
        instance:null
    },
    onLoad:function () {
        resManager.instance = this;
        cc.log("resManager 添加成功");
    },

    start:function () {
        
    },

    // 加载资源
    loadRes:function(path, callback){
        cc.loader.loadRes(path, function( err, res)
        {
            callback(err, res);
        });
    },

    load:function(path, callback){
        cc.loader.load(path, function(err, res)
        {

        });
    },

    loadScene:function(sceneName, callback){
        cc.director.loadScene(sceneName, function(){
            callback();
        });
    },

    logerr:function()
    {
        cc.log("========测试log=============================");
    }
});

module.exports = resManager;
