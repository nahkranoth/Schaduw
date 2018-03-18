import WorldManager from './worldManager'
import LightingPipeLine from './lightingPipeline'

export default class Main extends Phaser.Scene{

    constructor(){
        super('main');
        this.jump_locked;
        this.jump_toggle;
        this.double_jump_locked;
        this.dash_locked;
        this.momentum;
        this.momentumIncrease = 8;
        this.momentumCap = 200;
    }

    preload(){
        this.load.image('level_tm', 'level_tm.png');
        this.load.spritesheet('player_sprite', 'player_tm.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.tilemapTiledJSON('map', 'map2.json');
        this.lightingPipeline = this.textures.game.renderer.addPipeline('CustomLight', new LightingPipeLine(this, this.textures.game));

    }

    create(){
        console.log(this.textures);
        this.textures.generate("light",{data:["1"], pixelWidth:800, pixelHeight:600});
        //his.add.image(0, 0, 'light');
        this.player = this.physics.add.sprite(180, 320, 'player_sprite');
        this.worldManager = new WorldManager(this);

        this.cameras.main.setBounds(0, 0, this.worldManager.map.widthInPixels, this.worldManager.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.lightImg = this.add.sprite(400, 300, 'light');
        this.lightImg.depth = 100;
        this.lightImg.setPipeline('CustomLight');
        this.lightImg.setScrollFactor(0);
        this.physics.add.collider(this.player, this.worldManager.groundLayer);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    jump(){
        if(this.jump_locked) return;
        this.jump_locked = true;
        this.player.body.setVelocityY(-250);
    }

    doubleJump(){
        if(this.double_jump_locked) return;
        this.double_jump_locked = true;
        this.player.body.setVelocityY(-350);
    }

    dashDown(){
        if(this.dash_locked) return;
        this.dash_locked = true;
        this.player.body.setVelocity(400);
    }

    update(){
        this.player.body.setVelocityX(0);


        if(this.cursors.right.isDown) {
            this.player.body.setVelocityX(100 + Math.min(this.momentum, this.momentumCap));
            this.momentum += this.momentumIncrease;
        }
        else if(this.cursors.left.isDown) {
            this.player.body.setVelocityX(-100 - Math.min(this.momentum, this.momentumCap));
            this.momentum += this.momentumIncrease;
        }else{
            this.momentum = 0;
        }

        if(this.cursors.up.isDown ) {
            this.jump();
            if(this.jump_locked && !this.jump_toggle){
                this.doubleJump();
            }
            this.jump_toggle = true;
        }else{
            this.jump_toggle = false;
        }

        if(this.cursors.down.isDown && !this.player.body.onFloor()) {
            this.dashDown();
        }

        if(this.player.body.onFloor()){
            this.jump_locked = false;
            this.dash_locked = false;
            this.double_jump_locked = false;
        }
        if(this.player.body.onWall()){
            this.jump_locked = false;
            this.dash_locked = false;
            this.double_jump_locked = false;
            this.player.body.setVelocityY(0);
            this.player.body.setGravityY(0);
        }
        this.worldManager.update();
        this.lightingPipeline.update();
        // console.log(this.player.body.y);
        this.lightingPipeline.setSourcePos(this.player.body.x, this.player.body.y);

    }
}
