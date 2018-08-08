/**
 * 定义数据结构
 */
var defStruct = {};

/**
 * 定义MatchVS中用到的玩家进入房间携带的数据,每次new都会创建一个新的profile
 * MatchVSUserProfile
 */
defStruct.createMVSUserProfile = function (strName){
    return {
        name : strName,   // 名称
        useAd : false,    // 是否使用了AD的功能
    }
}

/**
 * 临时创建玩家的接口
 */
defStruct.createPlayer = function(){
    return {
        userId : 0,
        name : strName,
        useAd : false,
        killNum : 0,
        campid : 0,
    }
}

/**
 * 临时创建机器人的接口
 */
defStruct.createRobot = function(){
    return {
        userId : 0,
        name : strName,
        useAd : false,
        killNum : 0,
        campid : 0,
    }
}

/**
 * 确定框的样式
 */
defStruct.ConfirmUIType = {
    OnlyText:1,
    All:2,
    OnlyConfirm:3,
}

module.exports = defStruct;