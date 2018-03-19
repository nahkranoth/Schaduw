export default class WorldManager {

    constructor(game){
        this.culledFaces = [];
        this.game = game;
        this.map = game.add.tilemap('map');
        let groundTiles = this.map.addTilesetImage('level_tm');
        this.groundLayer = this.map.createDynamicLayer('Ground Layer', groundTiles);
        this.groundLayer.setCollisionBetween(1, 2);
        this.updateFaces();
    }

    update(){
        this.updateFaces();
    }

    updateFaces(){
        let culledTiles = this.getCulledTiles();
        this.culledFaces = this.getFaces(culledTiles);
    }

    getFaces(tiles){
        let faces = [];
        tiles.forEach((t) => {
            let face = {x:t.x*t.width, y:t.y*t.height};
            faces.push(face);
        });
        return faces;
    }

    getCulledTiles(){
        let tiles = [];
        const rowAmount = this.groundLayer.culledTiles.length;
        for(let i=0;i<rowAmount;i++){
            const tile = this.groundLayer.culledTiles[i];
            if(tile.index == -1){
                break;
            }
            tiles.push(tile);
        }
        return tiles;
    }
}
