cc.Class({
    extends: cc.Component,

    properties: {
        move_speed: 280,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.move_speed = 200;
        this.node.runAction(cc.repeatForever(cc.moveBy(1, cc.v2(-this.move_speed, 0))));
    },

    // update (dt) {},
});
