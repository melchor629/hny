varying vec2 vTexCoord;
varying vec2 vWallUv;
varying vec2 vCorner1Uv;
varying vec2 vCorner2Uv;
varying vec2 vCorner3Uv;
varying vec2 vCorner4Uv;
varying vec2 vMaskUv;

uniform sampler2D wall;
uniform sampler2D corner1;
uniform sampler2D corner2;
uniform sampler2D corner3;
uniform sampler2D corner4;
uniform vec4 wallClip;
uniform sampler2D mask;
uniform int up;
uniform float applyMask; // this value is only for aftertop walls

vec4 blend(vec4 src, vec4 dest) {
  // https://stackoverflow.com/a/73498765
  vec4 result = vec4(0.0, 0.0, 0.0, mix(dest.a, 1.0, src.a));
  result.rgb = result.a == 0.0 ? dest.rgb : mix(dest.rgb * dest.a, src.rgb, src.a) / result.a;
  return result;
}

void main(void) {
  // read texels from textures using UV transform for each
  vec4 wallColor = texture2D(wall, vWallUv);
  vec4 corner1Color = texture2D(corner1, vCorner1Uv);
  vec4 corner2Color = texture2D(corner2, vCorner2Uv);
  vec4 corner3Color = texture2D(corner3, vCorner3Uv);
  vec4 corner4Color = texture2D(corner4, vCorner4Uv);
  vec4 maskColor = texture2D(mask, vMaskUv);

  // calculate wall clip for mask (1.0 mask apply - 0.0 mask does not apply)
  // see https://github.com/pixijs/pixijs/blob/dev/packages/core/src/filters/spriteMask/spriteMaskFilter.frag (but inverted)
  float clip = applyMask * step(
    3.5,
    step(wallClip.x, vTexCoord.x)
      + step(wallClip.y, vTexCoord.y)
      + step(vTexCoord.x, wallClip.z)
      + step(vTexCoord.y, wallClip.w)
  );

  // combine all walls and corners
  vec4 wallsColor = blend(
    corner4Color,
    blend(
      corner3Color,
      blend(
        corner2Color,
        blend(
          corner1Color,
          wallColor
        )
      )
    )
  );

  // apply mask
  wallsColor = (clip * wallsColor * (1.0 - maskColor.a))
    + ((1.0 - clip) * wallsColor);

  // apply up/down split mask
  const float vertClipMaskPos = 0.79;
  if (up > 0) {
    wallsColor *= step(vertClipMaskPos, vTexCoord.y);
   } else {
    wallsColor *= step(vTexCoord.y, vertClipMaskPos);
   }

  gl_FragColor = wallsColor;
}
