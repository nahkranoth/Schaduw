import lightShader from './Shaders/lightShader'

export default class LightingPipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline{

    //Note: You have to use a Dynamic Tile Layer because it automaticly culls for you and also the index will be updated

    constructor(main, game){
        let light = new lightShader();
        let fragShader = light.getFragment();
        super({game:game, renderer: game.renderer, fragShader:fragShader});
        this.main = main;
        this.setFloat2('uResolution', game.config.width, game.config.height);
        this.setFloat2('uTileDimension', 32, 32);
        this.setFloat2("uSourcePos", 255, 255);
        this.counter = 0;
    }

    createFaces(){
        let f_faces = [0,0];
        this.main.worldManager.culledFaces.forEach((f) => {
            f_faces.push(f.x);
            f_faces.push(f.y);
        });
        return f_faces;
    }

    setSourcePos(x, y){
        this.setFloat2("uSourcePos", x, y);
    }

    update(){
        this.counter ++;
        this.setFloat2("uCameraPosition", this.main.cameras.main.scrollX, this.main.cameras.main.scrollY);
        let f_faces = this.createFaces();
        let faces = new Float32Array(f_faces);
        this.renderer.setProgram(this.program);
        this.renderer.gl.uniform2fv(this.renderer.gl.getUniformLocation(this.program, 'uFaces'), faces, 2);

    }
}
