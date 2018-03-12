import lightShader from './Shaders/lightShader'

export default class LightingPipeline extends Phaser.Renderer.WebGL.Pipelines.TextureTintPipeline{

    constructor(game){
        let light = new lightShader();
        let fragShader = light.getFragment();
        super({game:game, renderer: game.renderer, fragShader:fragShader});
        this.setFloat2('uResolution', game.config.width, game.config.height);
    }
}
