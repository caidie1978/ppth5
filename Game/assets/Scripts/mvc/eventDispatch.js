/************************************************
 eventDispatch
 @author wy
 *************************************************/

 var Map = require("Map");

var eventDispatch = (function(){
    var unique;
    unique = new _eventDispatch();

    return unique;
 })();


 function _eventDispatch(){
     cc.log("eventDispatch init.");
 }


 eventDispatch.callbackList = null;

/**
 * 使用之前先调用下Init
 */
eventDispatch.init = function(){
    eventDispatch.callbackList = new Map();
}

/**
 * 订阅消息
 */
eventDispatch.register = function(type, callback, targerobj){
    var isExist = eventDispatch.callbackList.contains(type);
    if (isExist){
        var arr = eventDispatch.callbackList.get(type);
        arr.push([callback, targerobj]);
    }else{
        var arr = new Array();
        arr.push([callback, targerobj]);
        eventDispatch.callbackList.put(type, arr);
    }
}


eventDispatch.unregister = function(type){
    var isExist = eventDispatch.callbackList.contains(type);
	if (isExist) {
		var arr = eventDispatch.callbackList.get(type);
		for (var i = 0; i < arr.length; i++) {
			if (arr[i][0] == callback) {
				arr.splice(i, 1);
				return true;
			}
		}
		return false;
	} 
	return false;
}

eventDispatch.removeByType = function(type){
    var isExist = eventDispatch.callbackList.contains(type);
	if (isExist) {
		return eventDispatch.callbackList.remove(type);
	} 
	return false;
}

eventDispatch.removeAll = function(){
    eventDispatch.callbackList.clear();
}

 // send Message
 eventDispatch.send = function(type, obj){
     var isExist = eventDispatch.callbackList.contains(type);
     if (isExist){
        // cc.log("发送事件处理");
        var arr = eventDispatch.callbackList.get(type);
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] != undefined && arr[i] != null) {
				arr[i][0](obj, arr[i][1]);
			}
		}
     }
 }

module.exports = eventDispatch;