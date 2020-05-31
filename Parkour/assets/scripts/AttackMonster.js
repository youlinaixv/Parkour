import GameData from "GameData";


cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    update (dt) {
        if(GameData.instance.attack_now) {
            var world_monster = this.node.parent.convertToWorldSpaceAR(this.node.position);
            var world_person = GameData.instance.person_pos;
            var distance_x = world_monster.x - world_person.x;
            if(Math.abs(distance_x) < 480) {
                this.node.active = false;
                this.node.destroy();
            }
        }
    },
});
