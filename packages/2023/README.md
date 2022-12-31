# Happy New Year 2023

Let's play together!

A small game, 2D isometric-like in your browser, to celebrate the new year. You are a wizard student (_aprendiz de mago_) which experiments with a spell that goes wrong. Your mission is to fix the mess down the dungeon. In there, you will have to solve several puzzles but also learn more about the world. Find them all!

## Internals

The game is made using three.js and react (_that again yup_). The mini-engine is based on Pixi.js spritesheets (initially I was going to use it) that loads them to the GPU, accompanied with shaders that understands which sprite to render from the spritesheet. These can be found in `src/data/spritesheets/`. There is also an `src/data/assets-manifest.json` with references to assets to load (again from Pixi.js).

Each spritesheet then is mapped to either _props_ or _npcs_. Sprite definitions can be found inside `src/data/props/` and `src/data/npcs/`. These are then rendered by `<MapProp />` and `<MapNpc />` components. They are usually used inside other components to easily reuse the sprites. Props and NPCs components can be found inside `src/objects/props/` and `src/objects/npcs`.

Walls are rendered by using `<MapTile />` which uses two special spritesheets (`bricks-floor.json` and `Walls.json`) to render all floor and walls combinations. The floor is generated using the `src/gen_tiles.py` script (and it is the only stuff made by a script, everything else made in Piskel). The `<MapTile />` component looks for the sprites to render, mixed with a shader that applies the affect around the player behind a wall, and voilà!

Scenarios combine all of these base elements to render the "scenario" (wow). They can be found inside `src/scenarios/`. There is one special scenario called `<Global />` which handles the rendering and load of the specific scenario to show, but also tracks the collisions and the player.

The UI/HUD is rendered outside three.js using standard HTML5 elements (and react ofc). All UI elements can be found inside `src/hud/` (including the menu).

Controls are abstracted using a hook and three implementations for each kind of input. `useInput()` (`src/hooks/use-input.ts` and `src/ui/input/`) handles _Keyboard_, _Gamepad_ and _Touch_ inputs like they were one. The only special thing is that there are some `onClick` event handlers in several UI elements for _Touch_ input (that usually also works with mouse). For _Keyboard_ and _Gamepad_ to work, I added a _pointer lock_ mechanism so the player won't use the mouse. This is mainly because Chrome does not ignore _Gamepad_ events even if the window has no focus. Also because mouse in the UI did not work quite well.

State is managed by several hooks using Zustand (see `src/hooks/`). Some of them have persistance in local storage (that's how game save is implemented!). The state handles some of the UI elements, as well as scenario state and dialogs.

Talking about dialogs. The dialog mechanism is a mix of the UI elements (`src/ui/dialog/`) and the hook (`src/hooks/use-dialog.ts`). Dialogs are defined inside the data folder (`src/data/dialogs/`) using a builder pattern to simplify its built. They are really powerful and allow all kind of interactions while dialog is still running. The dialogs are processed by the react components that apply the rendering and interaction (see `src/ui/dialog/dialog-text.tsx`) combined by the zustand store/hook.

The game also has some notification system to tell the player something happened and not related with dialogs. There is a hook to handle the notifications (`src/hooks/use-notifications.ts`) and the UI counterpart to render them (`src/ui/notifications/`).

## Assets

There are several kind of assets, and the the way they are used also depends.

- **Textures**: these are mainly for rendering in-game (WebGL) or pixelated in UI (React+CSS). Except one file, all files are `.png`s (the exception is a `.webp`) and the reason is to have them in the highest quality possible (lossless png, optimized). The `.webp` is for a NPC that don't really need to be highest quality.
- **Photos**: these are the collectibles, content from other people. `.webp` is highly available across the web ecosystem and offers good balance between quality and size. There is only one exception which is a `.png` to be rendered as pixelated.
- **Videos**: there are some videos (for the menu and for the last photo) that play in loop. They are offered in two quality options: VP9 (almost all browsers except iOS/iPad OS) and HEVC (iOS/iPad OS - thanks apple 👍).
- **Spritesheets**: these are files that contains how to render the spritesheet textures (position and sizes). Generated from Piskel.
- **Dialogs**: JS code for dialogs, all of them.
- **NPCs**: definition for NPCs, including spritesheets, bounding boxes (collisions) and states.
- **Props**: definition for props, including spritesheet and bounding boxes (collisions).
- **Shaders**: shaders 🤔
- `assets-manifest.json`: mapping from some textures with alias to real path to the texture (comes from old experiment of pixi.js).
- `inventory.ts`: item "database" (game uses IDs but to render them, the data is in this file).
- `photos.ts`: photo "database" (similar as for inventory, but for the photos).

## LORE

Appart from the dialogs in-game, there are some files in `src/data/dialogs/` that contain more lore :)

## Credits

- The team behind [react-three-fiber](https://github.com/pmndrs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei) and [zustand](https://github.com/pmndrs/zustand)
- Also to the team behind [Piskel](https://www.piskelapp.com/)
- Fonts [Mali](https://fonts.google.com/specimen/Mali?query=Mali) and [Indie Flower](https://fonts.google.com/specimen/Dancing+Script?query=dancing+script)
- **To those who participated in the Drive Form and sent me those photos**
- To the one that helped me with Japanese text
- To the one that provided me with several audiovisual material
