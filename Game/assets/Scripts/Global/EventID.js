/**************************************************
 事件定义
*************************************************/

var EventID = {
    GameInit:"GameInit",
    OpenLobby:"Openlkobby",
    LobbySceneInit:"LobbySceneInit",
    StartRandomBattle:"StartRandomBattle",
    StartTeamBattle:"StartTeamBattle",
    ReturToLobby:"ReturToLobby",

    OpenConfrim:"OpenConfirm",
    OnConfirmClkOk:"OnConfirmClkOk",
    OnConfirmClkCancel:"OnConfirmClkCancel",

    OnSignRandomBattle:"OnSignRandomBattle",
    OnSignTeamBattle:"OnSignTeamBattle",
    
    BattleSceneInit:"BattleSceneInit",      // 战斗场景初始化完成
    QuickJoinBattle:"QuickJoinBattle",      // 个人战斗，快速战斗 
}

module.exports = EventID;