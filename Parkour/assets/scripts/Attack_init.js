cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.getComponent(cc.Button).interactable = false;
        this.node.color = cc.Color.RED;
    },

    // update (dt) {},
});
