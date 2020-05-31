import GameData from "GameData"


cc.Class({
    extends: cc.Component,

    properties: {
        WXSubContextView: {
            default: null,
            type: cc.Node,
            serializable: true,
        }
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    showRanking () {
        let updateTime = parseInt(new Date().getTime() / 1000);
        let getArr = new Array();
        getArr.push("score");

        let openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage({
            type: "GET",
            data: getArr,
            timer: updateTime
        });
        this.subContextView.enabled = true;
        this.WXSubContextView.active = true;
        this.subContextView.update();
    },

    hideRanking () {
        this.subContextView.enabled = false;
        this.WXSubContextView.active = false;
    },

    sendMsgToOpenData () { //游戏结束时调用
        console.log("sendMsg");
        let the_score = GameData.instance.score;
        let updateTime = parseInt(new Date().getTime() / 1000);
        let _value = JSON.stringify({
            "wxgame": {
                "score": the_score,
                "update_time": updateTime
            }
        });

        let arr = new Array();
        arr.push({key: "score", value: _value});

        let openDataContext = wx.getOpenDataContext();
        openDataContext.postMessage({
            type: "SET",
            data: arr,
            timer: updateTime
        });
    },

    refreshRanking () {
        this.hideRanking();
        this.showRanking();
    },

    start () {
        this.subContextView = this.WXSubContextView.getComponent(cc.WXSubContextView);
        this.subContextView.enabled = false;
        this.WXSubContextView.active = false;
    },

    // update (dt) {},
});
