/**
 * MatchVS接口管理，包装MatchVS尽量使其细节对上层透明
 */

var mvs = require("./MVSModule/MatchVS");
var MVS_CONFIG = require("./MatchVSConfig");

/**
 * 保存User信息
 */
var MVS_UserInfo = {
    mvsUserID:null, // mvs用户ID
    mvsToken:null,  // 用户的Token
}

/**
 * 定义房间类型
 */
var RoomMode = {
    Single:0,       // 个人战
    CreateTeam:1,   // 自建组队房间
}

/**
  * 个人战房间属性 加入房间结构
  */
 function getJoinSingleRoomProperties(){
    var matchinfo = new mvs.MsMatchInfo();
    matchinfo.maxPlayer = 8;    // 最大玩家数
    matchinfo.mode = 0;         // 模式
    matchinfo.canWatch = 0;     // 是否可以观战
    matchinfo.tags = {"title": "个人战"};
    return matchinfo;
 }

/**
 * 组队战房间属性 创建房间属性
 * @param {string} roomName 
 */
 function getCreateTeamRoomProperties(roomName){
    var create = new mvs.MsCreateRoomInfo();
    create.name = roomName; // 房间名称
    create.maxPlayer = 8;   // 最大玩家数
    create.mode = 1;        // 模式
    create.canWatch = 0;    // 是否可以观战
    create.visibility = 0;  // 是否可见
    return create;
 }

/**
 * 单例模式构造器
 */
var MatchVSMgr = function(){
    if (!MatchVSMgr.ins){
        this.isInitOk = false;
        MatchVSMgr.ins = this;
    }
    return MatchVSMgr.ins;
}

MatchVSMgr.prototype.isInit = function(){
    return this.isInitOk;
}

/**
 * 注册回调到
 */
MatchVSMgr.prototype.setResponseClass = function(instRsp){
    mvs.response.createRoomResponse = instRsp.createRoomResponse;
    mvs.response.joinRoomResponse = instRsp.joinRoomResponse;
    mvs.response.joinRoomNotify = instRsp.joinRoomNotify;
    mvs.response.joinOverResponse = instRsp.joinOverResponse;
    mvs.response.joinOverNotify = instRsp.joinOverNotify;
    mvs.response.leaveRoomResponse = instRsp.leaveRoomResponse;
    mvs.response.leaveRoomNotify = instRsp.leaveRoomNotify;
    mvs.response.sendEventResponse = instRsp.sendEventResponse;
    mvs.response.sendEventNotify = instRsp.sendEventNotify;
    mvs.response.gameServerNotify = instRsp.gameServerNotify;
    mvs.response.errorResponse = instRsp.errorResponse;
    mvs.response.networkStateNotify = instRsp.networkStateNotify;
    mvs.response.setFrameSyncResponse = instRsp.setFrameSyncResponse;
    mvs.response.sendFrameEventResponse = instRsp.sendFrameEventResponse;
    mvs.response.frameUpdate = instRsp.frameUpdate;
    mvs.response.hotelHeartBeatRsp = instRsp.hotelHeartBeatRsp;
    mvs.response.gatewaySpeedResponse = instRsp.gatewaySpeedResponse;
    mvs.response.heartBeatResponse = instRsp.heartBeatResponse;
    mvs.response.roomCheckInNotify = instRsp.roomCheckInNotify;
    mvs.response.disConnectResponse = instRsp.disConnectResponse;
    mvs.response.setRoomPropertyResponse = instRsp.setRoomPropertyResponse;
    mvs.response.setRoomPropertyNotify = instRsp.setRoomPropertyNotify;
    mvs.response.reconnectResponse = instRsp.reconnectResponse;
    mvs.response.joinOpenNotify = instRsp.joinOpenNotify;
    mvs.response.joinOpenResponse = instRsp.joinOpenResponse;
}

/**
 * 初始化 fcb为返回结果回调 
 * fcb = functoin(status, result); status > 0 成功，< 0 失败 result 是错误原因
 * status 是否初始化成功 true/false
 * result 结果字符串
 */
MatchVSMgr.prototype.init = function(fcb = null){
    if (fcb == null) fcb = (s, r)=>{console.log('init:' + s + " " + r);}
    this.isInitOk = false;
    mvs.response.initResponse = function(status){
        if (MVS_CONFIG.mvsAutoRegUser){
            this.regUser(fcb);
        }else{
            fcb(1, "初始化成功");
            this.isInitOk = true;
        }
    }.bind(this);

    // SDK初始化
    var result = mvs.engine.init(mvs.response, 
        MVS_CONFIG.mvsChannel, 
        MVS_CONFIG.mvsPlatform, 
        MVS_CONFIG.mvsGameID);

    if (result !== 0) {
        fcb(-1, "初始化失败:"  + result);
    }
}

/**
 * 注册用户，这里暂时和初始化绑定在一起，貌似上层不关心这个接口
 * 课修改MVS_CONFIG.mvsAutoRegUser的值解除这种绑定
 */
MatchVSMgr.prototype.regUser = function(fcb = null){
    if (fcb == null) fcb = (s, r)=>{console.log('init:' + s + " " + r);}

    mvs.response.registerUserResponse = function(userInfo){
        MVS_UserInfo.mvsUserID = userInfo.id;
        MVS_UserInfo.mvsToken = userInfo.token;
        this.login(fcb);
    }.bind(this);

    // 清理缓存
    if(MVS_CONFIG.mvsClearUserCache){
        mvs.LocalStore_Clear();
    }

    var result = mvs.engine.registerUser();
    if (result !== 0)
        fcb(-1, '注册用户失败，错误码:' + result);
}

/**
 * 用户登录接口
 */
MatchVSMgr.prototype.login = function (fcb = null) {
    if (fcb == null) fcb = (s, r)=>{console.log('init:' + s + " errCode:" + r);}

    mvs.response.loginResponse = function (info) {
        if (info.status !== 200)
            fcb(-1, '登录失败,异步回调错误码:' + info.status);
        else {
            // 是否需要重进房间
            if (MVS_CONFIG.mvsReJoinLastRoom){
                if (info.roomID != null && info.roomID !== '0') {
                    var result = mvs.engine.reconnect();
                }
                if (result === 0) {
                    fcb(2, "断线重连成功");
                    this.isInitOk = true;
                } else {
                    fcb(1, "登陆成功");
                }
            } else {
                if (info.roomID != null && info.roomID !== '0') {
                    // 发送退出房间的消息？
                    mvs.engine.leaveRoom("");
                }
                fcb(1, "登陆成功");
                this.isInitOk = true;
            }
        }
    }.bind(this);

    var result = mvs.engine.login(
        Number(MVS_UserInfo.mvsUserID), 
        MVS_UserInfo.mvsToken,
        MVS_CONFIG.mvsGameID,
        MVS_CONFIG.mvsVersion,
        MVS_CONFIG.mvsAppKey,
        MVS_CONFIG.mvsSecret,
        MVS_CONFIG.mvsDeviceID,
        MVS_CONFIG.mvsGateWayID);
    if (result !== 0)
        fcb(-1, '登录失败,错误码:' + result);
}

/**
 * 获取我的MatchVSUserID
 */
MatchVSMgr.prototype.getMyUserID = function(){
    return MVS_UserInfo.mvsUserID;
}

/**
 * 加入个人展房间
 * @param {MatchVSUserProfile} userProfile 
 */
MatchVSMgr.prototype.joinSingleBattleRoom = function(userProfile){
    var matchInfo = getJoinSingleRoomProperties();
    mvs.engine.joinRoomWithProperties(matchInfo, JSON.stringify(userProfile))
}

/**
 * 创建房间
 * @param {string} roomName 
 * @param {MatchVSUserProfile} userProfile 
 */
MatchVSMgr.prototype.createTeamRoom = function(roomName, userProfile){
    var createRoomInfo = getCreateTeamRoomProperties(roomName);
    mvs.engine.createRoom(createRoomInfo, JSON.stringify(userProfile))
}

/**
 * 加入指定房间号房间
 * @param {Number} roomid 
 * @param {MatchVSUserProfile} userProfile 
 */
MatchVSMgr.prototype.joinSpecifyRoom = function(roomid, userProfile){
    mvs.engine.joinRoom(roomid, JSON.stringify(userProfile));
}

module.exports = {
    mvsMgr:new MatchVSMgr(),
}