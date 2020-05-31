cc.Class({
    extends: cc.Component,


    properties: {
        speed: 0.2,
        progressBarView: {
            type: cc.ProgressBar,
            default: null
        },

        person: {
            default: null,
            type: cc.Node
        },
    },


    onLoad: function () { //game场景的map_start做成预制体
        this._ping = true;
        this.progressBarView.progress = 0;
        cc.director.preloadScene("game");
    },

    update: function (dt) {
        this._updateProgressBar(this.progressBarView, dt);
        if(this.progressBarView.progress >= 1.0){
            this.person.active = false;
            this.person.destroy();
            cc.director.loadScene("game");
        }
    },
    
    _updateProgressBar: function(progressBar, dt){

        var progress = progressBar.progress;
        if(progress < 1.0 && this._ping){
            progress += dt * this.speed;
        }
        progressBar.progress = progress;
        
        
    }
    
});

