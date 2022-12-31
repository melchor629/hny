in vec2 vTexCoord;

uniform sampler2D color;

void main(void) {
  gl_FragColor = texture2D(color, vTexCoord);
}
