cc.Class({
    extends: cc.Component,

    properties: {
        border: {
            default: null,
            type: cc.Node
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        
    },

    update (dt) {
        this.node.x = this.border.x;
        this.node.y = this.border.y;
    },
});
