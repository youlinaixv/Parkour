import GameData from "GameData";


cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    Play_again () {
        if(GameData.instance) {
            GameData.instance.init();
        }
        cc.director.loadScene("start");
    },

    start () {

    },

    // update (dt) {},
});
