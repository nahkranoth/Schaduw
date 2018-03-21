export default class WorldManager {

    constructor(game){
        this.culledFaces = [];
        this.game = game;
        this.map = game.add.tilemap('map');
        let groundTiles = this.map.addTilesetImage('hitlayer');
        let building1Tiles = this.map.addTilesetImage('building1');
        this.groundLayer = this.map.createDynamicLayer('HitTest', groundTiles);
        this.foregroundLayer = this.map.createDynamicLayer('ForeGround', building1Tiles);
        this.groundLayer.setCollisionBetween(0, 9999);
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
