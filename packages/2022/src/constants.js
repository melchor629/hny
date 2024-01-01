export const publicUrl = '.'
export const aoMapUrl = `${publicUrl}/assets/texture/aomap.png`
export const farBeatUrl = `${publicUrl}/assets/audio/far-beat.m4a`
export const elFrascoUrl = `${publicUrl}/assets/audio/el-frasco.m4a`
export const farExplosionUrl = `${publicUrl}/assets/audio/far-explosion.m4a`
export const objectBrokenUrl = `${publicUrl}/assets/model/object-broken.glb`
export const objectOkUrl = `${publicUrl}/assets/model/object-ok.glb`
export const partsUrl = `${publicUrl}/assets/data/parts.yaml`
export const apiUrl =
  import.meta.env.PROD ? '/api/2022' : 'http://localhost:3001/api/2022'
