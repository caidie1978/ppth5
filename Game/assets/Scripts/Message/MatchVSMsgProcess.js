/**
 * 消息处理
 */
function MatchVSMsgProcess() {


    /**
     *
     * @param rsp {MsCreateRoomRsp}
     */
    this.createRoomResponse = function (rsp) {

    };

    /**
     *
     * @param status
     * @param roomUserInfoList
     * @param roomInfo
     */
    this.joinRoomResponse = function (status, roomUserInfoList, roomInfo) {
        if (status !== 200) {
            return this.labelLog('进入房间失败,异步回调错误码: ' + status);
        } else {
            this.labelLog('进入房间成功');
            this.labelLog('房间号: ' + roomInfo.roomID);
            mvs.engine.getRoomDetail(roomInfo.roomID)
        }
        this.labelRoomID.string = roomInfo.roomID;
        GLB.roomId = roomInfo.roomID;
        var userIds = [GLB.userID];
        this.player1.string = GLB.userID;
        var self = this;
        userInfoList.forEach(function (item) {
            if (item.userId === GLB.userID) {
            } else if (self.player2.string === '') {
                self.player2.string = item.userId;
            } else if (self.player3.string === '') {
                self.player3.string = item.userId;
            }
            if (GLB.userID !== item.userId) {
                userIds.push(item.userId);
            }
        });
        this.labelLog('房间用户: ' + userIds);
        mvs.response.sendEventNotify = this.sendEventNotify.bind(this); // 设置事件接收的回调
        GLB.playerUserIds = userIds;
        if (userIds.length >= GLB.MAX_PLAYER_COUNT) {
            mvs.response.joinOverResponse = this.joinOverResponse.bind(this); // 关闭房间之后的回调
            var result = mvs.engine.joinOver("");
            this.labelLog("发出关闭房间的通知");
            if (result !== 0) {
                this.labelLog("关闭房间失败，错误码：", result);
            }
    
            GLB.playerUserIds = userIds;
        }
    };
    /**
     * message NoticeJoin
     *{
     *    PlayerInfo user = 1;
     *}
     * message PlayerInfo
     *{
     *    uint32 userID = 1;
     *    bytes userProfile = 2;
     *}
     * @param roomUserInfo {MsRoomUserInfo}
     */
    this.joinRoomNotify = function (roomUserInfo) {
        this.labelLog("joinRoomNotify, roomUserInfo:" + JSON.stringify(roomUserInfo));
        if (this.player1.string === '') {
            this.player1.string = roomUserInfo.userId;
        } else if (this.player2.string === '') {
            this.player2.string = roomUserInfo.userId;
        } else if (this.player3.string === '') {
            this.player3.string = roomUserInfo.userId;
        }
        if (GLB.playerUserIds.length === GLB.MAX_PLAYER_COUNT - 1) {
        }
    };
    /**
     * message NoticeLeave
     *{
     *    uint32 userID = 1;
     *    uint64 roomID = 2;
     *    uint32 owner = 3;
     *}
     * @type rsp {NoticeLeave}
     */
    this.joinOverResponse = function (rsp) {

    };

    /**
     *
     * @param notifyInfo {MsJoinOverNotifyInfo}
     */
    this.joinOverNotify = function (notifyInfo) {

    };


    /**
     * message LeaveRoomRsp
     *{
     *    ErrorCode status = 1;//200.成功 | 403.房间关闭 | 404.房间不存在 | 500.服务器错误
     *    uint64 roomID = 2;
     *    uint32 userID = 3;
     *    bytes cpProto = 4;
     *}
     * @param rsp {LeaveRoomRsp}
     */
    this.leaveRoomResponse = function (rsp) {

    };
    /**
     *
     * @param leaveRoomInfo {MsLeaveRoomNotify}
     */
    this.leaveRoomNotify = function (leaveRoomInfo) {

    };
  
    /**
     *
     * @param rsp {MsSendEventRsp}
     */
    this.sendEventResponse = function (rsp) {

    };
    /**
     *
     * @param tRsp {MsSendEventNotify}
     */
    this.sendEventNotify = function (tRsp) {

    };
    /**
     *
     * @param tRsp {MsGameServerNotifyInfo}
     */
    this.gameServerNotify = function (tRsp) {

    };
    /**
     *
     * @param errCode {Number}
     * @param errMsg {string}
     */
    this.errorResponse = function (errCode, errMsg) {

    };

    /**
     *
     * @param notify{MsNetworkStateNotify}
     */
    this.networkStateNotify = function (notify) {

    };

    /**
     *
     * @param rsp {MsSetChannelFrameSyncRsp}
     */
    this.setFrameSyncResponse = function (rsp) {

    };
    /**
     *
     * @param rsp {MsSendFrameEventRsp}
     */
    this.sendFrameEventResponse = function (rsp) {

    };
    /**
     *
     * @param data {MsFrameData}
     */
    this.frameUpdate = function (data) {

    };
    /**
     *
     * @param data {number}
     */
    this.hotelHeartBeatRsp = function (data) {

    };

    /**
     *
     * @param rsp {MsGatewaySpeedResponse}
     */
    this.gatewaySpeedResponse = function (rsp) {

    };

    /**
     *
     * @param rsp
     */
    this.heartBeatResponse = function (rsp) {

    };

    /**
     *
     * @param rsp
     */
    this.roomCheckInNotify = function (rsp) {

    };

    /**
     * 主动断开网络接口回调
     * @param rep
     */
    this.disConnectResponse = function (rep) {

    };

    /**
     *
     * @param rsp {MsSetRoomPropertyRspInfo}
     */
    this.setRoomPropertyResponse = function (rsp) {

    };

    /**
     *
     * @param notify
     */
    this.setRoomPropertyNotify = function (notify) {

    };


    /**
     *
     * @param status
     * @param roomUserInfoList
     * @param roomInfo
     */
    this.reconnectResponse = function (status, roomUserInfoList, roomInfo) {
    };

    this.joinOpenNotify = function (rsp) {
    };
    this.joinOpenResponse = function (notify) {
    };
}

module.exports = MatchVSMsgProcess;