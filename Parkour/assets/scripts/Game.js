import GameData from "GameData"


cc.Class({
    extends: cc.Component,

    properties: {
        audioSource: {
            type: cc.AudioSource,
            default: null
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        manager.enabledDebugDraw = false;
        cc.director.preloadScene("end", function () {});
    },

    start () {
        var voice = GameData.instance.voice;
        if (voice == 1) {
            this.audioSource.play();
        }
    },

    // update (dt) {},
});
