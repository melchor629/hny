# Happy New Year 2021

This _happy new year_ project is a mix of a pre-rendered scene and some cards rendered in real-time, which interacts with user input. The pre-rendered scene is a Blender scene (see `files/models.blend`) with several steps. The output images are stored in `public/assets/textures/background` and used as a texture for a plane placed in the background, rotated and scaled to be always facing the camera, but with a material that does not get affected by lights. The cards are also modeled in Blender (there is a collection called `three` or similar), and exported in GLTF format and stored in `public/assets/models/card.glb`. Each card is a react component that holds the logic for user interaction, animation (using `react-spring`) and rendering (using `three.js` and `react-three-fiber`). Each card loads a set of textures from `public/assets/textures/cards/${cardName}`, and depending on the screen size, will use the 1024, 2048 or 4096 size. The textures are created using Gimp (see `files/cards.xcf`). For some reason, each texture must be rotated by 180º and flipped vertically. To reduce the size, each texture is compressed using an image optimizer with lossy mode enabled.

> To see the `files` files, you need git-lfs

## Credits

- <vecteezy.com> for a Fireworks vectorial image
- [Playfair Display](https://fonts.google.com/specimen/Playfair+Display?query=play#standard-styles) font
- [three.js](https://threejs.org) for its wonderful library
- The team behind [react-three-fiber](https://github.com/pmndrs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), [@react-three/post-processing](https://github.com/pmndrs/react-postprocessing), [@react-spring/three](https://github.com/pmndrs/react-spring) and [zustand](https://github.com/pmndrs/zustand)
- Yes, this is a react project
- **To those who participated and sent me a text for the cards ❤️**
- Also thank Blender and Gimp for be such awesome pieces of software
