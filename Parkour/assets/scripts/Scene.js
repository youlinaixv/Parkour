import GameData from "GameData";


cc.Class({
    extends: cc.Component,

    properties: {
        back1: {
            default: null,
            type: cc.Node
        },

        back2: {
            default: null,
            type: cc.Node
        },

        back3: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        var pos_bg = this.node.getPosition();
        var pos_back1 = this.back1.getPosition();
        var pos_back2 = this.back2.getPosition();
        var pos_back3 = this.back3.getPosition();
        if(pos_bg.x - pos_back1.x >= 1920) {
            this.back1.setPosition(cc.v2(pos_bg.x + 1920 * 2, pos_back1.y));
            
        } else if(pos_bg.x - pos_back2.x >= 1920) {
            this.back2.setPosition(cc.v2(pos_bg.x + 1920 * 2, pos_back2.y));
        } else if(pos_bg.x - pos_back3.x >= 1920) {
            this.back3.setPosition(cc.v2(pos_bg.x + 1920 * 2, pos_back2.y));
        }
        GameData.instance.distance += dt * this.back1.getComponent("BorderMove").move_speed / 48;
    },
});
