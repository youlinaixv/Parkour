cc.Class({
    extends: cc.Component,

    properties: {
        content: cc.Node,
        prefab: cc.Prefab,
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {
        wx.onMessage(reData=>{
            if(reData.type == "GET") {
                let children = this.content.children;
                let length = children.length;
                for(let i = 0; i < length; i++) {
                    children[i].destroy();
                }

                wx.getFriendCloudStorage({
                    keyList: reData.data,
                    success: res=>{
                        let _tempArr = [];
                        for(let i = 0; i < res.data.length; i++) {
                            let _parseScore = JSON.parse(res.data[i].KVDataList[0].value).wxgame.score;
                            _tempArr.push(_parseScore);
                        }
                        _tempArr.sort((a, b)=>b - a);

                        let index = 0;
                        while(index < _tempArr.length && index < 20) {
                            for(let i = 0; i < res.data.length; i++) {
                                let _parseScore = JSON.parse(res.data[i].KVDataList[0].value).wxgame.score;
                                if(_tempArr[index] == _parseScore) {
                                    this.createUserBlock(res.data[i], index);
                                    res.data.splice(i, 1);
                                    break;
                                }
                            }
                            index++;
                        }
                    },
                })
            }else if(reData.type == "SET") {
                let the_score = JSON.parse(reData.data[0].value).wxgame.score;
                wx.getUserCloudStorage({
                    keyList: ["score"],
                    success:function(res) {
                        let max_score = 0;
                        if(res.KVDataList.length) {
                            max_score = JSON.parse(res.KVDataList[0].value).wxgame.score;
                        }
                        if(max_score <= the_score) { 
                            wx.setUserCloudStorage({
                                KVDataList: reData.data,
                                success:function(res) {
                                    console.log("存储成功");
                                },
                                fail:function(res) {
                                    console.error(res);
                                },
                                complete(res) {}
                            });
                        }
                    },
                    fail:function(res) {
                        console.error(res);
                    }
                });
            }
        })
    },

    createUserBlock:function(user, index) {
        let node = cc.instantiate(this.prefab);
        node.x = 0;
        node.y = 160 - index * 100;

        let userName = node.getChildByName("Name").getComponent(cc.Label);
        userName.string = user.nickName || user.nickname;

        let score = node.getChildByName("Score").getComponent(cc.Label);
        let _parseScore = JSON.parse(user.KVDataList[0].value).wxgame.score;
        score.string = _parseScore;

        cc.loader.load({
            url: user.avatarUrl,
            type: "png",
        }, (err, texture)=>{
            if(err) {
                console.error(err);
            }
            let userIcon = node.getChildByName("mask").children[0].getComponent(cc.Sprite);
            userIcon.spriteFrame = new cc.SpriteFrame(texture);
        })
        this.content.addChild(node);
    },

    // update (dt) {},
});
