cc.Class(
    {
        extends : cc.Component,

        properties : {
            player : {
                default : null,
                type : cc.Node,
            },

            tiledMap : {
                default : null,
                type : cc.TiledMap,
            },

            label : {
                default: null,
                type : cc.Label,
            },

            moveSpeed : 10,

            // 地图层级对象
            _barriersLayer : null,
            _itemLayer : null,
            // 当前地图格子索引
            _curPosIndex : null,
            // 进入下一关的地图索引
            _nextPosIndex : null,

            _moveX : 0,
            _moveY : 0,
            _IsMovePos : true,
        },

        onLoad : function()
        {
            this.node.on("touchmove",this.onMoveStart, this);
            this.node.on("touchend",this.onMoveEnd, this);
            this.node.on("touchcancel",this.onMoveEnd, this);
        },

        start : function()
        {
            this.loadMap();
        },

        // 移动
        onMoveStart : function(event)
        {
            var curX = event.getLocation().x - event.getPreviousLocation().x;
            var curY = event.getLocation().y - event.getPreviousLocation().y;

            var x = Math.abs(curX);
            var y = Math.abs(curY);

            this._moveX = 0;
            this._moveY = 0;

            if (x > y)
            {
                this._moveX = curX > 0 ?  1 : -1;

                // 走格子
                if (this._IsMovePos == false)
                {
                    var posIndex = cc.p(this._curPosIndex.x, this._curPosIndex.y);
                    posIndex.x += this._moveX;
                    this.tryMoveToNewTile(posIndex);
                }
            }
            else if (y > x)
            {
                 this._moveY = curY > 0 ?  1 : -1;

                // 走格子
                if (this._IsMovePos == false)
                {
                    var posIndex = cc.p(this._curPosIndex.x, this._curPosIndex.y);
                    osIndex.y += this._moveY;
                    this.tryMoveToNewTile(posIndex);
                }
            }
        },
        // 取消移动
        onMoveEnd : function(event)
        {
            this._moveX = 0;
            this._moveY = 0;
        },

        loadMap : function()
        {
            //初始化地图位置
            //this.node.setPosition(cc.visibleRect.bottomLeft);

            var roleGroup = this.tiledMap.getObjectGroup("role");
            var startPos = roleGroup.getObject("start").offset;
            var endPos = roleGroup.getObject("end").offset;

            this._curPosIndex = this.getTilePosIndex(startPos);
            this._nextPosIndex = this.getTilePosIndex(endPos);
            this._barriersLayer = this.tiledMap.getLayer("barriers");
            this._itemLayer = this.tiledMap.getLayer("item");

            this.updatePlayerPos(this._curPosIndex);
        },

        update : function(time)
        {
            if (this._IsMovePos)
            {
                if (this._moveX != 0 || this._moveY != 0)
                {
                    this.tryMoveToPos(this._moveX,this._moveY,time);
                }
            }
        },

        //将地图中像素坐标转化为格子坐标(非游戏内的坐标)(地图和角色坐标系必须一样(瞄点现在是00左下方为中心点))
        getTilePosIndex: function(pos) {
            var tileSize = this.tiledMap.getTileSize();
            var row = this.tiledMap.getMapSize().height;
            var x = Math.floor(pos.x / tileSize.width);
            var y = Math.floor(pos.y / tileSize.height - 1);
            return cc.p(x, y);
        },

        // 游戏中的坐标转换成地图格子索引
        getTilePosByGamePos : function(pos)
        {
            var PosIndex = this.getTilePosIndex(pos);
            // 地图格子坐标系左下为00点坐标,格子是左上第一个开始,这里要重新计算y
            var row = this.tiledMap.getMapSize().height;
            PosIndex.y = row - 1 - PosIndex.y - 1;
            return PosIndex;
        },

        updatePlayerPos: function(posIndex) {
            var pos = this._barriersLayer.getPositionAt(posIndex);
            this.player.setPosition(pos);
        },

        tryMoveToNewTile: function(newTile) {
            var mapSize = this.tiledMap.getMapSize();
            if (newTile.x < 0 || newTile.x >= mapSize.width) return;
            if (newTile.y < 0 || newTile.y >= mapSize.height) return;
    
            if (this._barriersLayer.getTileGIDAt(newTile)) {//GID=0,则该Tile为空
            }
            else
            {
                this.tryRemoveStar(newTile);
    
                this._curPosIndex = newTile;
                this.updatePlayerPos(newTile);
        
                if (cc.pointEqualToPoint(this._curPosIndex, this._nextPosIndex)) {
                    cc.log('succeed');
                }
            }
        },

        // x y 表示方向 =1 x右y上, =-1 x左y下
        tryMoveToPos: function(x,y,time) {
            var pos = cc.p(Math.floor(this.player.x + x * this.moveSpeed * time),Math.floor(this.player.y + y * this.moveSpeed * time));
            var calPos = cc.p(pos.x,pos.y);
            var tileSize = this.tiledMap.getTileSize();
            // 左下为00点,这里+一个格子坐标为了UI不穿帮
            if (x > 0)
                calPos.x += tileSize.width;
            else if (y > 0)
                calPos.y += tileSize.height;

            var posIndex = this.getTilePosByGamePos(calPos);
            if (this.CheckTiledIndexMove(posIndex) == false)
            {
                // 再次用原坐标修正计算
                var tempPosIndex = this.getTilePosByGamePos(pos);
                if (cc.pointEqualToPoint(tempPosIndex, posIndex)) {
                    return;
                }
                if (this.CheckTiledIndexMove(tempPosIndex) == false)
                    return;
                posIndex = tempPosIndex;
                calPos = this._barriersLayer.getPositionAt(posIndex);
                if (x > 0)
                    pos.x = calPos.x;
                else if (y > 0)
                    pos.y = calPos.y;
            }

            this.printLabel(pos,posIndex);
            this.player.setPosition(pos);

            // 没走出当前格子
            if (cc.pointEqualToPoint(this._curPosIndex, posIndex)) {
                return;
            }
  
            this.tryRemoveStar(posIndex);
            this._curPosIndex = posIndex;
    
            if (cc.pointEqualToPoint(this._curPosIndex, this._nextPosIndex)) {
                cc.log('succeed');
            }
        },

        // 检测格子坐标是否可行走
        CheckTiledIndexMove : function(posIndex)
        {
            var mapSize = this.tiledMap.getMapSize();
            if (posIndex.x < 0 || posIndex.x >= mapSize.width) return false;
            if (posIndex.y < 0 || posIndex.y >= mapSize.height) return false;

            // 碰到阻挡了
            if (this._barriersLayer.getTileGIDAt(posIndex))
                return false;
            return true;
        },
    
        tryRemoveStar: function(vec2Index){
            var GID = this._itemLayer.getTileGIDAt(vec2Index);
            if (GID == 0)
                return;
            // 获取属性值
            var prop = this._itemLayer.getProperties();
            if (prop == null)
                return;
            if (prop.isItem == "1")
            {
                // 删除格子
                this._itemLayer.removeTileAt(vec2Index);
            }
        },

        printLabel : function(pos,posIndex)
        {
            this.label.string = "pos = " + pos + "   index = " + posIndex;
        },
    }
);