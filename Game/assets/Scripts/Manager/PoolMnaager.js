/**
 * 对象池管理器
 */

var NodePool = require('NodePool');
var Map = require("Map");

cc.Class({
    extends: cc.Component,

    properties: {
        PrefabPools:{
            serializable:false,
            default:null,
            type:Map
        }
    },

    onLoad:function(){
        this.PrefabPools = new Map();
    },

    // 从池中获取一个对象
    // TODO 未测试
    spawn:function(prefabName){

        // 现获取obj池，如果池不存在，则创建一个Obj池
        var objPool = null;
        if (!this.PrefabPools.contains(prefabName))
        {
            objPool = new NodePool();
            this.PrefabPools.put(prefabName, objPool);
        }
        else
        {
            objPool = this.PrefabPools.get(prefabName);
        }
        // 从池中获取对象，如果对象不存在则创建一个新的加到池中
        var prefab = objPool.request();

        if (null == prefab)
        {
            cc.loader.loadRes(path, function( err, res)
            {
                if (err)
                {
                    cc.error("Load Prefab Error info = " . err);
                    return null;
                }

                prefab = cc.instantiate(res);

                objPool.addNew(prefab);
            });
        }

        return prefab;
    },

    // 回收一个对象
    recovery:function(prefabName, obj){

        var objPool = null;
        if (!this.PrefabPools.contains(prefabName))
        {
            return;
        }

        objPool = this.PrefabPools.get(prefabName);

        objPool.recovery(obj);
    }


});
