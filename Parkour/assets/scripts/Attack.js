import GameData from "GameData"; 


cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    Attack_use () {
        GameData.instance.attack_now = 3;
        this.node.getComponent("Status").Attack_unable();
    },

    start () {

    },

    update (dt) {
        if(GameData.instance.attack_now > 0) {
            GameData.instance.attack_now--;
        }
    },
});
