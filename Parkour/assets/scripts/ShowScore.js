import GameData from "GameData";


cc.Class({
    extends: cc.Component,

    properties: {
        score_label: cc.Label,

        distance_label: cc.Label,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.score_label.string = GameData.instance.score;
        this.distance_label.string = "" + GameData.instance.distance.toFixed(1);
    },

    // update (dt) {},
});
