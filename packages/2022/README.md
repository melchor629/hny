# Happy New Year 2022

This _happy new year_ project is a mix of 3D content and HTML content in a React application. The user interacts through elements on the screen, which some of them have audio, to discover `T H E P A R T Y` and how it ends. The object has been created in Blender (see `files/object.blend`), and the broke effect is a combination of Rigid Body Simulation with a Dampen effect to slow down, animation baking (with manual interaction) and Cell Fracture to split the object in pieces. The object has two models: the not-broken one and the broken one (see `public/assets/model/object-ok.glb` and `public/assets/model/object-broken.glb`). The animation is exported in the `glb` object as well. Other animations are made by hand in JS. Examples of it are: the initial text party (that matches the beat), the fade out of extra pieces or the camera animation to the selected piece. The number of parts to keep is defined by the `public/assets/data/parts.yaml`, which contains all responses from a Twitter call I made with a form. Each value represents a moment, or a thought or a setence from the person that sent an anwser; representing the feelings, thoughts or whatever the person wants. With the reaction, it can have a song (all of them have, even though is optional) and a picture (also optional). The song is a Spotify Track which, through its API, plays 30s demo on the page (quality is not really good, MP3 96kbps...). Well, the app calls an API hosted on Vercel which in turns calls to Spotify with all credentials. Almost all images have been compressed and optimized for minimal resources, but keeping quality and size. Audios as well.

> To see the `files` files, you need git-lfs

Previous year, the load screen was a bit bugged: sometimes showed it finished but suddenly LOADING AGAIN. This year the loading has been improved with the usage of `useLoader.preload(...)`. All resources are loaded during the _preload_ phase (except moment images and Spotify tracks), and the models and shaders are sent to the GPU and precompiled to reduce stuttering. Relevant files are `src/components/the-preload.js`, `src/components/the-progres/` and the `Suspense` in `app.js`.

After the load, comes the welcome. Shows some information about what is going to happen, but more importantly, tricks the browser to allow the [`AudioContext`](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) to start. Why? Browsers now require user interaction to allow playing audio (either `<audio/>` `<video/>` or Web Audio API). But Safari goes further and only allows the `AudioContext` to start inside a user interaction callback. So when the user presses the button, the `AudioContext` is resumed. And there we have the user interaction required. Note that in this phase, it also has a nice star background (`src/app.js`).

The next phase, is the party one. The model beating with the music. Really nice, really good. Animation is done manually inside `src/components/the-object/the-full-object.js` (that is rendered by `src/components/the-object/the-object.js`). The state is handled by the `party` store (`src/stores/party.js`). The beat is also played inside the object's component. When the object is clicked/tapped, it starts a count down (with a sound) to break the object (handled by the store as well). The colors are also in the store.

When the object breaks, `src/components/the-object/the-object.js` changes to render `src/components/the-object/the-broken-object.js`. This component enqueues break animation to run and select which objects are going to stay, based on the `parts.yaml` data. Also handles when a part is clicked (after break animation), which shows the moment UI and fades out the object (still visible, but really transparent). Note that for transparency to work properly, the render order must be changed. Failing to do so, the transparent objects could not render properly when in front of stars or other objects.

The camera rotation and animation to the selected part is handled in `src/components/the-orbit-controls.js`, by default is always orbiting around with the `OrbitControls` of three.js, but when a part is selected, changes to manual animation of camera and disables the controls. And that's all, nothing more special about it.

The part UI is in `src/components/the-part/`. With the help of the API in the `hny-api` package, loads the track from Spotify API and starts playing it in the background (see `src/components/the-music-player.js`). The player has fade-in and fade-out effects, as well as handles early finish of the track. The UI has a fade-in/fade-out effect as well that matches the camera animation (more or less).

Do not forget about `src/components/the-effects.js`, which has all post process effects of the web.

## Credits

- The team behind [react-three-fiber](https://github.com/pmndrs/react-three-fiber), [@react-three/drei](https://github.com/pmndrs/drei), [@react-three/post-processing](https://github.com/pmndrs/react-postprocessing), [@react-spring/web](https://github.com/pmndrs/react-spring) and [zustand](https://github.com/pmndrs/zustand)
- Fonts [Quicksand](https://fonts.google.com/specimen/Quicksand?query=Quicksand) and [Indie Flower](https://fonts.google.com/specimen/Indie+Flower?query=indie+flower)
- Spotify API for providing track information and audio preview
- Once again, this is a react project
- Garage Band for the Apple Loops and instrumentation (wav in `files` are from there)
- _Al tio que fuma makelele los miercoles_
- **To those who participated and sent me a text for the moments ❤️**
- Thank Blender team to keep being such an awesome piece of software, and free
