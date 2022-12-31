out vec2 vTexCoord;

uniform mat3 uvTransform;

void main(void) {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  vTexCoord = (uvTransform * vec3(uv, 1.0)).xy;
}
