from collections import namedtuple
import json
import math
from pathlib import Path
from PIL import Image, ImageDraw, ImageMath

"""
This script generates the `bricks-floor.png` and `bricks-floor.json` from the base texture
`bricks-floor.png`. Optimized to generate the minimum required tiles for all viable combinations.
"""


Frame = namedtuple('Frame', ['x', 'y', 'w', 'h'])

Corner = namedtuple('Corner', ['lt', 'rt', 'rb', 'lb'])

Tile = namedtuple('Tile', ['image', 'walls', 'corners', 'row', 'column'])


def make_floor_mask(*sides):
  frame = Frame(0, 0, 32, 32)
  if 'top' in sides:
    frame = frame._replace(y=frame.y + 5, h=frame.h - 5)
  if 'right' in sides:
    frame = frame._replace(w=frame.w - 5)
  if 'bottom' in sides:
    frame = frame._replace(h=frame.h - 5)
  if 'left' in sides:
    frame = frame._replace(x=frame.x + 5, w=frame.w - 5)
  mask = Image.new('L', (32, 32), (0,))
  mask_draw = ImageDraw.Draw(mask)
  mask_draw.rectangle(
    [(frame.x, frame.y), (frame.x + frame.w, frame.y + frame.h)],
    fill=(255,),
  )
  return mask


def make_corner_mask(corners):
  mask = Image.new('L', (32, 32), (255,))
  mask_draw = ImageDraw.Draw(mask)
  if corners.lt:
    mask_draw.rectangle(
      [(0, 0), (4, 4)],
      fill=(0,),
    )
  if corners.rt:
    mask_draw.rectangle(
      [(28, 0), (31, 4)],
      fill=(0,),
    )
  if corners.rb:
    mask_draw.rectangle(
      [(28, 28), (31, 31)],
      fill=(0,),
    )
  if corners.lb:
    mask_draw.rectangle(
      [(0, 28), (4, 31)],
      fill=(0,),
    )
  return mask


def get_corner_name(corners):
  name = []
  if corners.lt:
    name.append('left-top')
  if corners.rt:
    name.append('right-top')
  if corners.lb:
    name.append('left-bottom')
  if corners.rb:
    name.append('right-bottom')
  return '_'.join(name)


def useless_combo(walls, corners):
  (lt, rt, rb, lb) = corners
  return (
    (walls.startswith('left') and (lt or lb)) or
    (walls.startswith('right') and (rt or rb)) or
    (walls.endswith('top') and (lt or rt)) or
    (walls.endswith('bottom') and (lb or rb)) or
    ((walls.endswith('both') or walls.startswith('both')) and (lb or rb or rt or lt))
  )


walls = {
  'left': make_floor_mask('left'),
  'right': make_floor_mask('right'),
  'top': make_floor_mask('top'),
  'bottom': make_floor_mask('bottom'),
  'left-top': make_floor_mask('left', 'top'),
  'left-bottom': make_floor_mask('left', 'bottom'),
  'left-both': make_floor_mask('left', 'top', 'bottom'),
  'right-top': make_floor_mask('right', 'top'),
  'right-bottom': make_floor_mask('right', 'bottom'),
  'right-both': make_floor_mask('right', 'top', 'bottom'),
  'both-top': make_floor_mask('left', 'right', 'top'),
  'both-bottom': make_floor_mask('left', 'right', 'bottom'),
  'center': make_floor_mask(),
  'center-both': make_floor_mask('top', 'bottom'),
  'both-center': make_floor_mask('left', 'right'),
}

corners = {corner: make_corner_mask(corner) for corner in [
  Corner(False, False, False, False),

  Corner(True, False, False, False),
  Corner(False, True, False, False),
  Corner(False, False, True, False),
  Corner(False, False, False, True),

  Corner(True, True, False, False),
  Corner(True, False, True, False),
  Corner(True, False, False, True),
  Corner(False, True, True, False),
  Corner(False, True, False, True),
  Corner(False, False, True, True),

  Corner(True, True, True, False),
  Corner(True, True, False, True),
  Corner(True, False, True, True),
  Corner(False, True, True, True),

  Corner(True, True, True, True),
]}


project_path = Path(__file__).parent.parent.absolute()

COLUMNS = 6

tiles = []
with Image.open(project_path / './public/assets/textures/bricks-floor-base.png') as base:
  for wall, wall_mask in walls.items():
    for corner, corner_mask in corners.items():
      if useless_combo(wall, corner):
        continue

      tile = Image.new('RGBA', (32, 32), (0, 0, 0, 0))
      mask = ImageMath.eval('convert(float(a) * float(b), "L")', a=wall_mask, b=corner_mask)
      tile.paste(base, mask)
      tiles.append(Tile(tile, wall, corner, len(tiles) // COLUMNS, len(tiles) % COLUMNS))

tiles.append(Tile(
  Image.new('RGBA', (32, 32), (0, 0, 0, 0)),
  'empty',
  Corner(False, False, False, False),
  len(tiles) // COLUMNS,
  len(tiles) % COLUMNS
))

rows = math.ceil(len(tiles) / COLUMNS)
tilemap_image = Image.new('RGBA', (32 * COLUMNS, 32 * rows), (0, 0, 0, 0))
for tile in tiles:
    tilemap_image.paste(tile.image, box=(32 * tile.column, 32 * tile.row))

tilemap_manifest = {
  'frames': {
    f'bricks-floor__{tile.walls}__{get_corner_name(tile.corners)}.png': {
      'frame': {'x': 32 * tile.column, 'y': 32 * tile.row, 'w': 32, 'h': 32},
      'rotated': False,
      'trimmed': False,
      'spriteSourceSize': {'x': 0, 'y': 0, 'w': 32, 'h': 32},
      'sourceSize': {'w': 32, 'h': 32},
    }
    for tile in tiles
  },
  'meta': {
    'image': 'bricks-floor.png',
    'format': 'RGBA8888',
    'size': {'w': tilemap_image.size[0], 'h': tilemap_image.size[1]},
  },
}

tilemap_image.save(project_path / './public/assets/textures/bricks-floor.png')
with open(project_path / './src/data/spritesheets/bricks-floor.json', 'w') as f:
  f.write(json.dumps(tilemap_manifest))
