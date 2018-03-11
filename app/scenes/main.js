import WorldManager from './worldManager'

export default class Main extends Phaser.Scene{

    constructor(){
        super('main');
    }

    preload(){
        this.load.spritesheet('level_tm', 'level_tm.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.spritesheet('player_sprite', 'player_tm.png',{ frameWidth: 32, frameHeight: 32 });
        this.load.tilemapTiledJSON('map', 'map1.json');

    }

    create(){
        this.player = this.physics.add.sprite(80, 70, 'player_sprite').setBounce(0.1);
        this.worldManager = new WorldManager(this);
        this.physics.add.collider(this.player, this.worldManager.groundLayer);
        this.cursors = this.input.keyboard.createCursorKeys();
    }

    placeTiles(){

    }

    update(){
        this.player.body.setVelocityX(0);
        if(this.cursors.right.isDown) {
            this.player.body.setVelocityX(100);
        }
        else if(this.cursors.left.isDown) {
            this.player.body.setVelocityX(-100);
        }
        if(this.cursors.up.isDown && this.player.body.onFloor()) {
            this.player.body.setVelocityY(-250);
        }
    }
}
