import GameData from "GameData";


cc.Class({
    extends: cc.Component,

    properties: {
        defend: false,

        sprint: false,

        sprint_time: 0,

        attack: 0,

        magnet: 0,

        float: {
            default: null,
            type: cc.Action
        },

        attack_btn: {
            default: null,
            type: cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    Attack_enable () {
        this.attack_btn.getComponent(cc.Button).interactable = true;
        this.attack_btn.color = cc.Color.GREEN;
    },

    Attack_unable () {
        this.attack_btn.getComponent(cc.Button).interactable = false;
        this.attack_btn.color = cc.Color.RED;
    },

    Cancel_defend () {
        var self = this;
        cc.loader.loadRes("Animation/Role/Run/Run__000", cc.SpriteFrame, function (err, spriteFrame) {
            self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        self.node.getComponent("Action").Stop_animation("All");
        self.node.getComponent("Action").Play_animation("Run");
    },

    Sprint_fly () {
        var pos = this.node.getPosition();
        this.node.stopAction(this.node.getComponent("Action").action);
        this.node.getComponent("Action").jump_time = 2;
        this.node.setPosition(cc.v2(pos.x, 200));
        this.node.stopAction(this.node.getComponent("Action").action);
        this.node.stopAction(this.float);
        this.float = cc.repeatForever(cc.sequence(
            cc.moveBy(0.5, cc.v2(0, 10)),
            cc.moveBy(0.5, cc.v2(0, -10)),
        ));
        this.node.runAction(this.float);
    }, 

    Change_status () {
        var self = this;
        if(self.defend && self.sprint) {
            /*cc.loader.loadRes("Person/defend_sprint", cc.SpriteFrame, function (err, spriteFrame) {
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });*/
            self.node.getChildByName("Sprint").active = false;
            self.node.getChildByName("Defend_sprint").active = true;
        }else if(self.defend) {
            self.node.getChildByName("Sprint").active = false;
            self.node.getChildByName("Defend_sprint").active = false;
            cc.loader.loadRes("Animation/Role/BubbleRun/run0", cc.SpriteFrame, function (err, spriteFrame) {
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            self.node.getComponent("Action").Stop_animation("All");
        }else if(self.sprint) {
            /*cc.loader.loadRes("Person/sprint", cc.SpriteFrame, function (err, spriteFrame) {
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });*/
            self.node.getChildByName("Sprint").active = true;
            self.node.getChildByName("Defend_sprint").active = false;
        }else if(!self.sprint) {
            self.node.getChildByName("Sprint").active = false;
            self.node.getChildByName("Defend_sprint").active = false;
            cc.loader.loadRes("Animation/Role/Run/Run__000", cc.SpriteFrame, function (err, spriteFrame) {
                self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
            });
            self.node.getComponent("Action").Stop_animation("All");
        }

        if(self.sprint) {
            self.Sprint_fly();
        }
    },
    
    start () {
        this.node.getChildByName("Sprint").active = false;
        this.node.getChildByName("Defend_sprint").active = false;
    },

    update (dt) {
        GameData.instance.person_pos = this.node.parent.convertToWorldSpaceAR(this.node.position);
        if(this.magnet > 0) {
            this.magnet--;
            GameData.instance.magnet_time = this.magnet;
        }
        if(this.sprint_time > 0) {
            this.node.getComponent("Action").Stop_animation("All");
            this.sprint_time--;
        }
        if(this.sprint_time <= 0 && this.sprint) {
            this.sprint = false;
            this.Change_status();
            this.node.stopAction(this.float);
            var pos = this.node.getPosition();
            var temp_action = this.node.getComponent("Action");
            this.node.stopAction(temp_action.action);
            this.node.runAction(cc.moveTo(0.5, cc.v2(pos.x, -135)));
            if(this.defend) {
                temp_action.Play_animation("BubbleRun");
            }else {
                temp_action.Play_animation("Run");
            }
            this.node.getComponent("Action").jump_time = 0;
        }
    },
});
