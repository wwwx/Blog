/**
 *
 * @author
 *
 */
var Blueplane = (function (_super) {
    __extends(Blueplane, _super);
    function Blueplane() {
        _super.call(this);
    }
    var d = __define,c=Blueplane,p=c.prototype;
    /**
     * 创建主角
     */
    p.init = function (s) {
        var plane = new Plane();
        var planeImage = new egret.Bitmap(RES.getRes("BluePlane_png"));
        plane.blood = 100;
        plane.bulletImage = "bullet_03_png";
        plane.Image = planeImage;
        plane.Type = "UP";
        plane.lives = 0;
        var sound = RES.getRes("bullet_mp3");
        plane.bulletSound = sound;
        this.BottomCenter(plane, s);
        planeImage.touchEnabled = true;
        s.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.PlaneMoveHandle, [plane, s]);
        s.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.PlaneMoveHandle, [plane, s]);
        return plane;
    };
    /**
     * 飞机移动处理
     */
    p.PlaneMoveHandle = function (e) {
        var plane = this[0];
        if (plane.Image == null)
            return;
        var parent = this[1];
        var hight = plane.Image.height;
        var wight = plane.Image.width;
        plane.Image.x = e.stageX - (wight / 2);
        plane.Image.y = e.stageY - (hight / 2);
        if (plane.Image.x <= 0) {
            plane.Image.x = 0;
        }
        if (e.stageX + wight / 2 >= parent.stage.stageWidth) {
            plane.Image.x = parent.stage.stageWidth - wight;
        }
        if (plane.Image.y <= 0) {
            plane.Image.y = 0;
        }
        if (e.stageY + hight / 2 >= parent.stage.stageHeight) {
            plane.Image.y = parent.stage.stageHeight - hight;
        }
        plane.X = plane.Image.x;
        plane.Y = plane.Image.y;
    };
    /**
     * 初始默认底部居中位子
     */
    p.BottomCenter = function (bit, s) {
        var mapHight = s.stage.stageWidth;
        var mapwight = s.stage.stageHeight;
        var hight = bit.Image.height;
        var wight = bit.Image.width;
        bit.X = (mapHight / 2) - (bit.Image.width / 2);
        bit.Y = mapwight - bit.Image.height;
        bit.Image.x = (mapHight / 2) - (bit.Image.width / 2);
        bit.Image.y = mapwight - bit.Image.height;
    };
    return Blueplane;
}(egret.DisplayObjectContainer));
egret.registerClass(Blueplane,'Blueplane');
//# sourceMappingURL=Blueplane.js.map