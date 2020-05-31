import GameData from "GameData"
 
 
cc.Class({
 
    extends: cc.Component,
 
    properties: {
 
    },
 
    // LIFE-CYCLE CALLBACKS:
 
    // onLoad () {},
 
    start () {
 
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.login({
                success: function(res){
                    //显示当前页面的转发按钮
                    wx.showShareMenu();
 
                    //监听用户点击右上角菜单的“转发”按钮时触发的事件
                    wx.onShareAppMessage(function(res){
 
                        return {
                            title: "来一起奔跑！",
                            imageUrl: "https://656e-env-innk5-1302155375.tcb.qcloud.la/share/share.png",
                            success(res){
                                console.log("转发成功!!!")
                                common.diamond += 20;
                            },
                            fail(res){
                                console.log("转发失败!!!")
                            }
                        }
                    });
                }
            });
        }
    },
 
    onShareClick () {
        if (cc.sys.platform === cc.sys.WECHAT_GAME) {
            wx.shareAppMessage({
                title: '不服来挑战，我得到了' + GameData.instance.score + "分！",
                imageUrl: "https://656e-env-innk5-1302155375.tcb.qcloud.la/share/share.png",
                success: function (res) {
                    console.log('主动拉起分享成功');
                },
                fail: function (res) {
                    console.log('主动拉起分享失败');
                }
            });
        }
    },
    // update (dt) {},
 
});