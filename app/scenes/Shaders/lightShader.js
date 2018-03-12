export default class LightShader{

    constructor(){
    }

    getFragment(){
        return `
            precision mediump float;
            
            uniform vec2 vTexCoord;
            uniform sampler2D uTexture;

            void main(void) {
                 vec4 img = texture2D(uTexture, vTexCoord);
                 gl_FragColor = img;
            }

            `
    }
}
