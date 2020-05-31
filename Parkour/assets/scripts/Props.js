cc.Class({
    extends: cc.Component,

    properties: {
        interval: 0,

        prop_data: {
            default: null,
            type: cc.JsonAsset
        },

        prop_prefab: {
            default: null,
            type: cc.Prefab
        },
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    Time_interval () {
        if(this.interval % 4 == 0 && this.interval != 0) {Q
            var id = Math.floor(Math.random() * 9);
            if(id <= 2) {
                id = 0;
            }else if(id <= 5) {
                id = 1;
            }else if(id <= 7) {
                id = 2;
            }else {
                id = 3;
            }
            var data = this.prop_data.json[id];
            if(data != undefined) {
                
                var self = this;
                cc.loader.loadRes(data.res, cc.SpriteFrame, function(err, spriteFrame) {
                    if(!err) {
                        var prop = cc.instantiate(self.prop_prefab);
                        prop.x = Math.random() * 480 + self.interval * 280;
                        prop.y = Math.random() * 190 + 100;
                        prop.getComponent("CertainProp").ID = data.ID;
                        prop.getComponent(cc.Sprite).spriteFrame = spriteFrame;
                        self.node.addChild(prop);
                    }    
                });
            }
        }
        this.interval++;
    },

    start () {
        
    },

    update (dt) {
        this.Time_interval();
    },
});
