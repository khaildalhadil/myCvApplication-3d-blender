uniform sampler2D uPerlinTextuer;
uniform float uTime;

varying vec2 vUv;



void main() {

  // scale and animate to make it changable
  vec2 smokeUv = vUv;
  smokeUv.x *= .5;
  smokeUv.y *= .5;
  smokeUv.y -= uTime *.03;


  float smoke = texture(uPerlinTextuer, smokeUv).r;
  // remap because it is alot of smoke 
  smoke = smoothstep(0.4, 1.0, smoke);

  // smoke = 1.0;
  smoke *= smoothstep(0.0, 0.1, vUv.x);
  smoke *= smoothstep(1.0, 0.9, vUv.x);

  smoke *= smoothstep(0.0, 0.1, vUv.y);
  smoke *= smoothstep(1.0, 0.5, vUv.y);


  gl_FragColor = vec4(0.6, 0.3, 0.2, smoke);
  // gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  // #include <tonemapping_fragment>
  // #include <colorspace_fragment>

}