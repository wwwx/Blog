/**
 *
 * @author
 *
 */
var Plane = (function () {
    function Plane() {
    }
    var d = __define,c=Plane,p=c.prototype;
    //开枪
    p.Shoot = function () {
        var bullet = new Bullet();
        bullet.Type = this.Type;
        bullet.Image = new egret.Bitmap(RES.getRes(this.bulletImage));
        bullet.Image.width = 64;
        bullet.Image.height = 64;
        bullet.Plane = this;
        if (this.Type == "Donw") {
            bullet.Image.rotation = 180;
            bullet.X = this.X + 31 - (this.Image.width / 2);
            bullet.Y = this.Y + 60;
        }
        else {
            if (this.Image != null) {
                bullet.bulletSound = this.bulletSound;
                bullet.X = this.X + (this.Image.width / 2 - 35);
                bullet.Y = this.Y - 45;
            }
        }
        bullet.Image.x = bullet.X;
        bullet.Image.y = bullet.Y;
        return bullet;
    };
    ;
    return Plane;
}());
egret.registerClass(Plane,'Plane');
//# sourceMappingURL=Plane.js.map