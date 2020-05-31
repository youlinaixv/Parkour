var GameData = cc.Class({
    extends: cc.Component,

    statics: {
        instance: null,
    },

    properties: {
        score: 0,

        distance: 0,

        magnet_time: 0,

        person_pos: {
            default: new cc.Vec2(),
        },

        attack_now: 0,

        voice: 0,

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    init () {
        this.score = 0;
        this.distance = 0;
        this.magnet_time = 0;
        this.person_pos = new cc.Vec2();
        this.attack_now = 0;
    },

    start () {
    },

    // update (dt) {},
});


GameData.instance = new GameData();
cc.game.addPersistRootNode(GameData.instance);

module.export = GameData;