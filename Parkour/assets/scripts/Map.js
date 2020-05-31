cc.Class({
    extends: cc.Component,

    properties: {
        map_a: {
            default: null,
            type: cc.Node
        },

        map_b: {
            default: null,
            type: cc.Node
        },

        map_data: {
            default: null,
            type: cc.JsonAsset
        },

        prefab_a: {
            default: null,
            type: cc.Prefab
        },

        prefab_b: {
            default: null,
            type: cc.Prefab
        },

        door_head_l: {
            default: null,
            type: cc.Node
        },

        door_head_r: {
            default: null,
            type: cc.Node
        },

        door_tail_l: {
            default: null,
            type: cc.Node
        },

        door_tail_r: {
            default: null,
            type: cc.Node
        },

        map_count: 0,

        in_hidden_map: false,

    },

    // LIFE-CYCLE CALLBACKS:

    //onLoad () {},

    Set_Map () {
        console.log(this.map_count);
        if(this.map_count == 8) {
            console.log("the hidden");
            this.map_count++;
            var id = Math.floor(Math.random() * 2 + 16);
            var data = this.map_data.json[id];
            if(data != undefined) {           
                var self = this;
                cc.loader.loadRes(data.res, function(err,loadedResource) {
                    if(!err) {
                        var map = cc.instantiate(loadedResource);
                        map.x = 3360;
                        map.y = 0;
                        self.door_head_l.active = true;
                        self.door_head_r.active = true;
                        self.door_tail_l.active = true;
                        self.door_tail_r.active = true;
                        self.door_head_l.x = 1440;
                        self.door_head_r.x = 1440;
                        self.door_tail_l.x = 5280;
                        self.door_tail_r.x = 5280;
                        self.node.addChild(map);
                        self.map_a = self.map_b;
                        self.map_b = map;
                    }    
                });
            }
            
        }else if(this.map_count > 3) {
            this.map_a = this.map_b;
            this.in_hidden_map = true;
        }else {
            var id = Math.floor(Math.random() * 16);
            var data = this.map_data.json[id];
            console.log("normal map", id + 1);
            if(data != undefined) {           
                var self = this;
                cc.loader.loadRes(data.res, function(err,loadedResource) {
                    if(!err) {
                        var map = cc.instantiate(loadedResource);
                        map.x = 2400;
                        map.y = 0;
                        self.node.addChild(map);
                        self.map_a = self.map_b;
                        self.map_b = map;
                        self.map_count++;
                    }    
                });
            }
        }
    },

    start () {

        var map1 = cc.instantiate(this.prefab_a);
        map1.x = 960;
        map1.y = 0;
        this.node.addChild(map1);
        this.map_a = map1;

        var map2 = cc.instantiate(this.prefab_b);
        map2.x = 2880;
        map2.y = 0;
        this.node.addChild(map2);
        this.map_b = map2;
    },

    update (dt) {
        if(!this.in_hidden_map){
            if(this.map_a && this.map_a != undefined) {
                var pos_map_a = this.map_a.getPosition();
                var pos_bg = this.node.getPosition();
                if(pos_map_a.x - pos_bg.x < -1440) {
                    var temp = this.map_a;
                    temp.destroy();
                    this.map_a = null;
                    this.Set_Map();
                }
                
            }
        }else {
            if(this.map_a && this.map_a != undefined) {
                var pos_map_a = this.map_a.getPosition();
                var pos_bg = this.node.getPosition();
                if(pos_map_a.x - pos_bg.x < -480 && this.map_count > 3) {
                    this.map_a = null;
                    this.map_count = 0;
                    this.Set_Map();
                }else if(pos_map_a.x - pos_bg.x < -2400) {
                    var temp = this.map_a;
                    temp.destroy();
                    this.map_a = null;
                    this.door_head_l.active = false;
                    this.door_head_r.active = false;
                    this.door_tail_l.active = false;
                    this.door_tail_r.active = false;
                    this.in_hidden_map = false;
                    this.Set_Map();
                }
            }
        }
    },
});
