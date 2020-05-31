cc.Class({
    extends: cc.Component,

    properties: {
    },

    run () {
        var speed = 60;
        this.node.runAction(cc.repeatForever(cc.moveBy(1, cc.v2(speed, 0))));

    },

    Play_animation () {
        var animation = this.getComponent(cc.Animation);
        animation.play('Run');
    },
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.Play_animation();
        this.run();
    },

    update () {

    },
});
