export default class LightShader{

    constructor(){
    }

    getFragment(){
        return `
            precision mediump float;
            
            uniform vec2 uFaces[400];
            uniform vec2 uTileDimension;
            uniform vec2 uSourcePos;
            uniform vec2 uCameraPosition;
            uniform vec2 uResolution;
            uniform sampler2D uTexture;
            
            #define source_pos vec2(255, 255)
            
            //mostly copied of github.com/and3rson/enlightenment
            
            bool ccw(in vec2 a, in vec2 b, in vec2 c){
                return (c.y - a.y) * (b.x - a.x) > (b.y - a.y) * (c.x - a.x);
            }
            
            bool intersects(in vec2 a, in vec2 b, in vec2 c, in vec2 d){
                return ccw(a, c, d) != ccw(b, c, d) && ccw(a, b, c) != ccw(a, b, d);
            }
            
            vec2 applyCameraTransformation(in vec2 point){
                return point - uCameraPosition;
            }
            
            vec2 normVector(vec2 vec){
               return vec / uResolution;  
            }
            
            bool inRange(float v, float c, float r){
                return (v > c && v < c+r);
            }
            
            vec2 flip(in vec2 v){
                return vec2(v.x, 1.0 - v.y);
            }
            
            void main(void) {
                 //vec4 img = texture2D(uTexture, vTexCoord);
                 vec2 uv = gl_FragCoord.xy / uResolution;
                 
                 vec2 sourcePos = vec2 (uSourcePos.x + (uTileDimension.x/2.0), uSourcePos.y + (uTileDimension.y/2.0));
                 
                 vec2 source = normVector(applyCameraTransformation(sourcePos));
                 vec2 tileSize = normVector(uTileDimension);
                 vec4 clr = vec4(0., 1., 1., 0.);
                 
                 bool isSourceBlocked = false;
                 for(int i=0;i<400;i++){
                    
                    vec2 uF = normVector(applyCameraTransformation(vec2(uFaces[i].x, uFaces[i].y)));
                    
                    vec2 face_a = flip( vec2(uF.x, uF.y) );
                    vec2 face_b = flip( vec2(uF.x + tileSize.x, uF.y) );
                    
                    vec2 face_c = flip( vec2(uF.x, uF.y + tileSize.y) );
                    vec2 face_d = flip( vec2(uF.x + tileSize.x, uF.y + tileSize.y) );
                    
                    vec2 f_source = vec2(source.x, 1.-source.y);
                    
                     if(intersects(f_source , uv , face_a , face_b)){
                        clr = vec4(0., 0., 0., 0.);
                        break;
                     }

                     if(intersects(f_source , uv , face_c , face_d)){
                        clr = vec4(0., 0., 0., 0.);
                        break;
                     }
                     
                     if(intersects(f_source , uv , face_a , face_c)){
                        clr = vec4(0., 0., 0., 0.);
                        break;
                     }
                     
                     if(intersects(f_source , uv , face_b , face_d)){
                        clr = vec4(0., 0., 0., 0.);
                        break;
                     }
                     
                    // if( inRange(uv.x, face_a.x, 0.01) && inRange(uv.y, face_a.y, 0.01) ){
                    //     clr = vec4(0., 0., 0., 0.);
                    //     break;
                    // }
                    //
                    // if( inRange(uv.x, face_b.x, 0.01) && inRange(uv.y, face_b.y, 0.01) ){
                    //     clr = vec4(0., 0., 0., 0.);
                    //     break;
                    // }
                    //
                    // if( inRange(uv.x, face_c.x, 0.01) && inRange(uv.y, face_c.y, 0.01) ){
                    //     clr = vec4(0., 0., 0., 0.);
                    //     break;
                    // }
                    //
                    // if( inRange(uv.x, face_d.x, 0.01) && inRange(uv.y, face_d.y, 0.01) ){
                    //     clr = vec4(0., 0., 0., 0.);
                    //     break;
                    // }
                    //
                    if(inRange(uv.x, source.x, 0.01) && inRange(uv.y, f_source.y, 0.01)){
                        clr = vec4(1., 1., 0., 0.);
                        break;
                    }
                 }
                 
                 gl_FragColor = clr;
            }

            `
    }
}
