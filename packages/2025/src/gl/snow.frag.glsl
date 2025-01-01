uniform vec3 color;
uniform float opacity;

void main() {
  vec4 texColor = vec4(1, 1, 1, 1);
  float d = distance(gl_PointCoord, vec2(0.5, 0.5));
  float final_opacity = opacity * (1.0 / (1.0 + exp(16.0 * (d - 0.25))));
  gl_FragColor = texColor * vec4(color, final_opacity);
}
