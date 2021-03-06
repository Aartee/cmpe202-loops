var game = {
    data: {
        score : 0,
        steps: 0,
        start: false,
        newHiScore: false,
        muted: false
    },

    resources: [
            // images
        {name: "bg", type:"image", src: "data/img/bg.png"},
        {name: "clumsy", type:"image", src: "data/img/clumsy.png"},
        {name: "pipe", type:"image", src: "data/img/pipe.png"},
        {name: "logo", type:"image", src: "data/img/logo.png"},
        {name: "ground", type:"image", src: "data/img/ground.png"},
        {name: "sky", type:"image", src: "data/img/sky.png"},
        {name: "gameover", type:"image", src: "data/img/gameover.png"},
        {name: "gameoverbg", type:"image", src: "data/img/gameoverbg.png"},
        {name: "hit", type:"image", src: "data/img/hit.png"},
        {name: "getready", type:"image", src: "data/img/getready.png"},
        {name: "new", type:"image", src: "data/img/new.png"},
        {name: "newhiscore", type:"image", src: "data/img/newhiscore.png"},
        {name: "loop", type:"image", src: "data/img/loop.png"},
        {name: "level2", type:"image", src: "data/img/getready.png"},
        {name: "pause", type:"image", src: "data/img/pause.png"},
        //{name: "menu", type:"image", src: "data/img/menu-button.png"},
      
        // sounds
        {name: "theme", type: "audio", src: "data/bgm/"},
        {name: "hit", type: "audio", src: "data/sfx/"},
        {name: "lose", type: "audio", src: "data/sfx/"},
        {name: "wing", type: "audio", src: "data/sfx/"},
    ],

    "onload": function() {
        if (!me.video.init(900, 600, {
            wrapper: "screen",
            scale : "auto",
            scaleMethod: "fit"
        })) {
            alert("Your browser does not support HTML5 canvas.");
            return;
        }
        me.audio.init("mp3,ogg");
        me.loader.preload(game.resources, this.loaded.bind(this));
    },

    "loaded": function() {
        //State design Pattern
        //Here all the states of the game are defined like
        // for TileScreen -> MENU
        //PlayScreen -> PLAY
        me.state.set(me.state.MENU, new game.TitleScreen());
        me.state.set(me.state.PLAY, new game.PlayScreen());
        me.state.set(me.state.GAME_OVER, new game.GameOverScreen());

        me.input.bindKey(me.input.KEY.SPACE, "fly", true);
        me.input.bindKey(me.input.KEY.M, "mute", true);
        me.input.bindPointer(me.input.KEY.SPACE);
        me.input.bindKey(me.input.KEY.S, "pause", true);
        me.input.bindKey(me.input.KEY.F, "toggleFullscreen", true);

        //Factory Design Pattern which 
        //registers different entities in the game
        this.entitySet();

        me.state.change(me.state.MENU);  
    },
    
    "entitySet": function(){
    
        me.pool.register("clumsy", game.BirdEntity);
        me.pool.register("loop", game.LoopEntity, true);
        me.pool.register("pipe", game.PipeEntity, true);
        me.pool.register("hit", game.HitEntity, true);
        me.pool.register("ground", game.Ground, true);
        me.pool.register("sky", game.Sky, true);
    }
    
    "factoryMethod": function() {
        this.createEntity =function(type){
        var entity;
            if(type == "clumsy"){
            entity = new BirdEntity();
            }
            else if(type == "loop"){
                entity = new LoopEntity();
            }
            else if(type == "pipe"){
            entity = new PipeEntity();
            }
            else if(type == "hit"){
            entity = new HitEntity();
            }
            else if(type == "ground"){
            entity = new Ground();
            }
           else if(type == "sky"){
            entity = new Sky();
            }
            return entity;
        }
        
           }
};



