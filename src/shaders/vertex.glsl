uniform float uTime;
uniform sampler2D uPerlinTextuer;

varying vec2 vUv;
#include ../includes/rotate2D.glsl;

void main() {

  vec3 newPosition = position;

  // Twist
  float twistPerlin = texture(uPerlinTextuer, vec2(0.5, uv.y * 0.2 - uTime * 0.005)).r;
  float angle = twistPerlin * 10.0;
  newPosition.xz = rotate2D(newPosition.xz, angle);

  // Smoke 
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);

  vUv = uv;
}