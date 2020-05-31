cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        this.node.getComponent("Rank").sendMsgToOpenData();
    },

    // update (dt) {},
});
