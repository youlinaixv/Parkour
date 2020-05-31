cc.Class({
    extends: cc.Component,

    properties: {
        jump_height: 170,

        jump_duration: 0.5,

        run_speed: 280,

        jump_time: 0,

        height_origin: 0,

        //is_falling: false,

        action: {
            default: null,
            type: cc.Action
        }
    },

    // onLoad () {},
    
    Jump_action (height) {
        this.action = cc.sequence(
            cc.moveBy(this.jump_duration, cc.v2(0, this.jump_height)),
            cc.moveBy(this.jump_duration, cc.v2(0, -this.jump_height)),
            cc.callFunc(this.Jump_reset, this),
            cc.callFunc(this.Fall_on_floor, this, height),
            cc.callFunc(this.Jump_to_run, this),
        );
        this.node.runAction(this.action);
    },

    Fall_on_floor (target, height) {
        if(height != this.height_origin) {
            var time = -(this.height_origin - height) * this.jump_duration / this.jump_height;
            this.action = cc.sequence(
                cc.moveBy(time, cc.v2(0, this.height_origin - height)),
                cc.callFunc(this.Jump_clear, this),
                
            );
            this.node.runAction(this.action);
        }
    },
    
    Jump_reset () {
        this.jump_time--;
    },

    Jump_clear () {
        this.jump_time = 0;
    },
    /*
    Falling () {
        this.is_falling = true;
    },

    Not_falling () {
        this.is_falling = false;
    },*/
    
    Jump_to_run () {
        var temp = this.node.getComponent("Status");
        this.Stop_animation("All");
        if(temp.defend) {
            this.Play_animation("BubbleRun");
        }else {
            this.Play_animation("Run");
        }
    },

    Jump () {
        if(this.jump_time >= 2) {
            return;
        }
        this.node.stopAction(this.action);
        var pos = this.node.getPosition();
        if(this.jump_time == 0) {
            this.height_origin = pos.y;
        }
        this.jump_time++;
        var temp = this.node.getComponent("Status");
        this.Stop_animation("All");
        if(temp.defend) {
            this.Play_animation("BubbleJump");
        }else {
            this.Play_animation("Jump");
        }
        this.Jump_action(pos.y);
    },

    Play_animation (arg) {
        var animation = this.getComponent(cc.Animation);
        animation.play(arg);
    },

    Stop_animation(arg) {
        var animation = this.getComponent(cc.Animation);
        if(arg != "All") {
            animation.stop(arg);
        }else {
            animation.stop();
        }
    },

    start () {
        this.Play_animation("Run");
    },

    //update (dt) {},
});
