/**
 *
 * @author
 *
 */
var Enemyplane = (function (_super) {
    __extends(Enemyplane, _super);
    function Enemyplane() {
        _super.call(this);
    }
    var d = __define,c=Enemyplane,p=c.prototype;
    /**
    * 创建敌军
    */
    p.init = function (x, y) {
        var enmyplanlist = ["GodPlane_png", "GreenPlane_png", "JitPlane_png", "JpPlane_png", "LiPlane_png", "LXPlane_png"];
        var planeIndex = Math.floor(Math.random() * enmyplanlist.length);
        var plane = new Plane();
        var planeImage = new egret.Bitmap(RES.getRes(enmyplanlist[planeIndex]));
        plane.blood = 100;
        plane.bulletImage = "bullet_02_png";
        plane.Image = planeImage;
        plane.Image.rotation = 180;
        plane.Image.x = x + 128;
        plane.Image.y = y + 128;
        plane.X = plane.Image.x;
        plane.Y = plane.Image.y;
        plane.Type = "Donw";
        plane.lives = 3;
        return plane;
    };
    return Enemyplane;
}(egret.DisplayObjectContainer));
egret.registerClass(Enemyplane,'Enemyplane');
//# sourceMappingURL=Enemyplane.js.map