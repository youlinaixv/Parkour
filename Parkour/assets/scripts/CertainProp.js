import GameData from "GameData";


cc.Class({
    extends: cc.Component,

    properties: {
        ID: 0,

        prop_data: {
            default: null,
            type: cc.JsonAsset
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    onCollisionEnter: function(other, self) {
        switch(this.ID) {
            case 1: 
            other.node.getComponent("Status").attack = 1; 
            other.node.getComponent("Status").Attack_enable();
            this.node.active = false; 
            this.node.destroy();
            break;
            case 2: 
            other.node.getComponent("Status").magnet = 1000;
            GameData.instance.magnet_time = 1000;
            this.node.active = false; 
            this.node.destroy();
            break;
            case 3: 
            if(!other.node.getComponent("Status").defend) {
                other.node.getComponent("Status").defend = true;
                other.node.getComponent("Status").Change_status();
                this.node.active = false;
                this.node.destroy();
            }
            break;
            case 4: 
            if(!other.node.getComponent("Status").sprint) {
                other.node.getComponent("Status").sprint = true;
                other.node.getComponent("Status").sprint_time = 1000;
                other.node.getComponent("Status").magnet = 1000;
                GameData.instance.magnet_time = 1000;
                other.node.getComponent("Status").Change_status();
                this.node.active = false;
                this.node.destroy();
            }
            break;
        }
        
    },

    start () {
        var id = Math.floor(Math.random() * 4);
        var data = this.prop_data.json[id];
        if(data != undefined) {
            var self = this;
            cc.loader.loadRes(data.res, cc.SpriteFrame, function(err, spriteFrame) {
                if(!err) {
                    self.ID = data.ID;
                    self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                }    
            });
        }
    },

    // update (dt) {},
});
