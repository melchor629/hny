// three.js fills with more uniforms and attributes
varying vec2 vTexCoord;

uniform mat3 floorUvTransform;

void main(void) {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vTexCoord = (floorUvTransform * vec3(uv, 1.0)).xy;
}
