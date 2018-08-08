/**
 * MatchVS 参数配置
 */
var MVS_CONFIG = {
    //------------------------------------------------------------------
    mvsChannel:"MatchVS",    // 渠道
    mvsPlatform :"alpha",    // 测试环境/正式环境 alpha/release (正式环境需要修改为release)
    //------------------------------------------------------------------
    mvsGameID:201645,        // MatchVS申请的GameID
    mvsAppKey:"8da9b5826f9747b1aa71114d67323009",
    mvsSecret:"08fb75ea034e4ae3b4adf34098ee18dc",
    //------------------------------------------------------------------
    mvsVersion:1,            // MatchVS登录时传递的版本号，用于匹配时进行不同版本的隔离 (正式环境按需填写)
    mvsReJoinLastRoom:false, // 用户登录重连后是否进入之前的房间，按当前需求这里是不需要重新连接的
    mvsDeviceID:"abcdef",    // 设备ID，用于多端登录检测，这里先用临时值
    mvsGateWayID:0,          // 服务器节点ID，默认为0
    //------------------------------------------------------------------
    mvsAutoRegUser:true,     // 是否初始化完毕后主动进行注册登录操作
    mvsClearUserCache:false, // MatchVS是否清理本地保存的User数据，true用于调试，如果不进行清理，每次调用会返回相同的用户id (正式环境需要修改为false)
    //------------------------------------------------------------------
    mvsUserFrameSync:true,   // 是否使用帧同步
    mvsFrameRate:20,         // 设置帧同步的速度,MatchVS最大20
}

module.exports = MVS_CONFIG;