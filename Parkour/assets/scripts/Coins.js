import GameData from "GameData";


cc.Class({
    extends: cc.Component,

    properties: {
        left_coin: false,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onCollisionEnter: function (other, self) {
        var voice = GameData.instance.voice;
        if(voice == 1) {
            cc.loader.loadRes('Music/coin', cc.AudioClip, function (err, clip){
                cc.audioEngine.play(clip, false, 0.6);
            })
        }
        self.node.active = false;
        self.node.destroy();
        GameData.instance.score += 10;
    },

    start () {
    },

    update (dt) {
        if(GameData.instance.magnet_time > 0) {
            var world_coin = this.node.parent.convertToWorldSpaceAR(this.node.position);
            var world_person = GameData.instance.person_pos;
            var distance_x = world_coin.x - world_person.x;
            var distance_y = world_coin.y - world_person.y;
            if(Math.abs(distance_x) < 480) {
                this.node.runAction(cc.repeatForever(cc.moveBy(1, cc.v2(200, 0))));
                this.node.runAction(cc.moveBy(0.2, cc.v2(-distance_x, -distance_y)));
                this.left_coin = true;
            }
        }else if(this.left_coin) {
            var world_coin = this.node.parent.convertToWorldSpaceAR(this.node.position);
            var world_person = GameData.instance.person_pos;
            var distance_x = world_coin.x - world_person.x;
            var distance_y = world_coin.y - world_person.y;
            this.node.runAction(cc.moveBy(0.2, cc.v2(-distance_x, -distance_y)));
        }
    },
});
