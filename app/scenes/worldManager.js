export default class WorldManager {

    constructor(game){
        this.map = game.make.tilemap({ key: 'map' });
        let groundTiles = this.map.addTilesetImage('level_tm');
        this.groundLayer = this.map.createDynamicLayer('Ground Layer', groundTiles, 0, 0);
        this.groundLayer.setCollisionBetween(1, 2);
        console.log("GROUNDLAYER:");
        console.log(this.groundLayer);
    }
}
