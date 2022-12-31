varying vec2 vTexCoord;

uniform sampler2D floor;

void main(void) {
  // read texels from texture using UV transform for each
  vec4 floorColor = texture2D(floor, vTexCoord);

  gl_FragColor = floorColor;
}
