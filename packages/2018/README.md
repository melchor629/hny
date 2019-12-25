# Happy New Year 2018

Dankest Happy New Year

Made with [popmotion][1], ES6 (without transpiler), good dancc material and love.

It just runs on the browser, it does not need to transpile nor bundle :)

[See it in action][2]

## How does this work?

In this webpage, the CSS is really important, as the elements in the HTML.

Every element you see in the page is located in the HTML in `.mensaje`, `.textNoice`, `.hhm`, `.cg`, `.sobreContainer` and `.otherStuff` divs.

The code is located in `anim.js` file.

The first thing you can see is the requirement of more than 1200px width. Then, it gets all the mentioned elements and prepares them to be animated (`styler` and `svg` functions).

There's an `AudioContext` class. This class loads the songs (checking for its compatibility in the browser) and it is able to play one of the songs given its name. This is used in the webpage in several places to play the "sounds" and "effects".

Below the previous class, there's the code that loads all the audio files. When they are all loaded (forgive me the way I check that, I know that `Promise.all` is best to do that, but by that time I was learning what a _Promise_ is), enables the start button. When clicked, transitions from the text to the letter.

The letter is animated moving in an arc path (`effect` function). When the _part that can be oppen of the letter_ is clicked, the animation is stoped (`parte.onclick = e => { ... };` function). That _part_ is opened and then the letter goes crazy (`crazySobre()`).

The background color is changed using the `trascending` class. The movement of the letter is done randomly as seen in line 149 to 153. It keeps the original Z rotation and positions by parsing the CSS style of the `transform` style of the letter container (`#sobreContainer`). After 4s of the beggining of the letter going crazy, `s e l f` appears. 0.2s after that, the letter stops.

`selfAppears()` is where the self animation takes place. Appears rotating and translating itself into the page. When `s e l f` is in place, starts the infinite `s e l f` stand animation (`selfStanding()`) and, at the same time, the letter disappears.

The stand animation of `s e l f` is simple: it moves around the original place in cycles of 5s in infinite time. The function `selfAppears()` also enables a click listener on `s e l f`. When the user clicks on `s e l f`, the `hhm...` (`.hhm` element) text appears near `s e l f` rapidly with the `hhm` sound. One second after, with a `setTimeout`, `showText()` is called.

In `showText()` the images `hns.png` and `3742.png` appears, at the top left of `s e l f`, and the "cool & good" sound is played (with its text - `.cg` element). 4s after the end of the fade-in animation of the images, `cykabliat()` is executed.

Here is when it gets worse the webpage. It starts playing a very rusian hard bass and everything and the background changes with the beats of the song (`t = t / 1000 * 145 / 60;` + `const tt = Math.trunc(t) % 7 + 1;` + `const tCycle = t - Math.trunc(t);`). `tt` holds which is the background color should be using. `tCycle` holds a vaule between [0, 1) to show the beats in the images. The function applied to `t` is to change the value of `t i m e` to match the beats of the song (145) and the FPS (60) in seconds (/1000). When the songs ends, the page goes to `about:blank` because there's nothing else to see :) (there's a workaround for Safari too).


  [1]: https://popmotion.io
  [2]: https://fan.melchor9000.me/2018
