import GameData from "GameData"


cc.Class({
    extends: cc.Component,

    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        },

        bg: {
            default: null,
            type: cc.Node,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var the_res = "";
        if(GameData.instance.voice) {
            this.play();
            GameData.instance.voice = 1;
            the_res = "Button/volume";
        }else {
            this.pause();
            GameData.instance.voice = 0;
            the_res = "Button/no_volume";
        }
        var self = this;
        cc.loader.loadRes(the_res, cc.SpriteFrame, function (err, spriteFrame) {
            self.bg.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },

    play: function () {
        this.audioSource.play();
    },

    pause: function () {
        this.audioSource.pause();
    },

    play_pause () {
        var the_res = "";
        if(GameData.instance.voice) {
            this.pause();
            GameData.instance.voice = 0;
            the_res = "Button/no_volume";
        }else {
            this.play();
            GameData.instance.voice = 1;
            the_res = "Button/volume";
        }
        var self = this;
        cc.loader.loadRes(the_res, cc.SpriteFrame, function (err, spriteFrame) {
            self.bg.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
    },

    start () {

    },

    // update (dt) {},
});
