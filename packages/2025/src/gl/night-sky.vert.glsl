varying vec3 vPos;

void main() {
  vPos = position;
  vec4 mvPosition = modelViewMatrix * vec4( vPos, 1.0 );
  gl_Position = projectionMatrix * mvPosition;
}
