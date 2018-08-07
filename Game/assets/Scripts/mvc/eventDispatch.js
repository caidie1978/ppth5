/************************************************
 eventDispatch
 @author wy
 *************************************************/

 var Map = require("Map");

 var eventDispatch = cc.Class({

        statics:{
            instance:null
        },

        properties:{
            callbackList:{ 
                serializable:false,
                default:null,
                type:Map
            }
        },

        init:function(){
            this.callbackList = new Map();
        },

        
        /**
         * 订阅消息
         */
        register:function(type, callback, targerobj){
            var isExist = this.callbackList.contains(type);
            if (isExist){
                var arr = this.callbackList.get(type);
                arr.push([callback, targerobj]);
            }else{
                var arr = new Array();
                arr.push([callback, targerobj]);
                this.callbackList.put(type, arr);
            }
        },


        unregister:function(type){
            var isExist = this.callbackList.contains(type);
            if (isExist) {
                var arr = this.callbackList.get(type);
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i][0] == callback) {
                        arr.splice(i, 1);
                        return true;
                    }
                }
                return false;
            } 
            return false;
        },

        removeByType:function(type){
            var isExist = this.callbackList.contains(type);
            if (isExist) {
                return this.callbackList.remove(type);
            } 
            return false;
        },

        removeAll:function(){
            this.callbackList.clear();
        },

        // send Message
        send:function(type, obj){
            var isExist = this.callbackList.contains(type);
            if (isExist){
                // cc.log("发送事件处理");
                var arr = this.callbackList.get(type);
                for (var i = 0; i < arr.length; i++) {
                    if (arr[i] != undefined && arr[i] != null) {
                        arr[i][0](obj, arr[i][1]);
                    }
                }
            }
        }
 });

eventDispatch.instance = new eventDispatch();
module.exports = eventDispatch;