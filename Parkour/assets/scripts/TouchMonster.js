cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onCollisionEnter: function (other, self) {
        if(other.node.getComponent("Status").sprint) {
            self.node.active = false;
            self.node.destroy();
            return;
        }
        if(other.node.getComponent("Status").defend) {
            other.node.getComponent("Status").defend = false;
            other.node.getComponent("Status").Cancel_defend();
            self.node.active = false;
            self.node.destroy();
        }else {
            other.node.getComponent("Status").attack = 0;
            other.node.getComponent("Status").magnet = 0;
            cc.director.loadScene("end");
        }
    },

    start () {

    },

    // update (dt) {},
});
