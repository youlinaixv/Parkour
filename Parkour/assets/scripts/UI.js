import GameData from "GameData";


cc.Class({
    extends: cc.Component,

    properties: {
        score_label: cc.Label,

        distance_label: cc.Label,

        interval: 0,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
    },

    Time_interval () {
        if(this.interval < 3) {
            this.interval ++;
        } else {
            this.distance_label.string = "" + GameData.instance.distance.toFixed(1);
            this.interval = 0;
        }
    },

    update (dt) {
        this.Time_interval();
        this.score_label.string = GameData.instance.score;
    },
});
