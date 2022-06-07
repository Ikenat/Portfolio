const fragmentShader = `
uniform float uProg;
uniform sampler2D uTexture;

varying vec2 vUv;
varying float vElevation;
varying float wave;


void main()
{
    vec4 textureColor = texture2D(uTexture, vUv);
    gl_FragColor = textureColor;
}`

export default fragmentShader;