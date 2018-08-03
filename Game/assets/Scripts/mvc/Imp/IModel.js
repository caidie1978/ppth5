/*************************************************************
 * Framework.Imodel
 * @author wy
 ************************************************************/

var eventDispatch = require("eventDispatch");

var IModel = cc.Class({
    // 消息分发
    send:function(key, obj){
        eventDispatch.send(key, obj);
    }

 });

 module.exports = IModel;