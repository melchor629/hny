// three.js fills with more uniforms and attributes
varying vec2 vTexCoord;
varying vec2 vWallUv;
varying vec2 vCorner1Uv;
varying vec2 vCorner2Uv;
varying vec2 vCorner3Uv;
varying vec2 vCorner4Uv;
varying vec2 vMaskUv;

uniform mat3 wallUvTransform;
uniform mat3 corner1UvTransform;
uniform mat3 corner2UvTransform;
uniform mat3 corner3UvTransform;
uniform mat3 corner4UvTransform;
uniform mat3 maskUvTransform;

void main(void) {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

  vTexCoord = uv;
  vWallUv = (wallUvTransform * vec3(uv, 1.0)).xy;
  vCorner1Uv = (corner1UvTransform * vec3(uv, 1.0)).xy;
  vCorner2Uv = (corner2UvTransform * vec3(uv, 1.0)).xy;
  vCorner3Uv = (corner3UvTransform * vec3(uv, 1.0)).xy;
  vCorner4Uv = (corner4UvTransform * vec3(uv, 1.0)).xy;
  vMaskUv = (maskUvTransform * vec3(uv, 1.0)).xy;
}
