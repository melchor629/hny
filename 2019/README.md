# Happy New Year 2019

Beautiful fireworks and GPU eater.

Made with [TypeScript][1], [webpack][2], [SCSS][5], [anime.js][3] and with code from [http://animejs.com/documentation/assets/js/fireworks.js][4].

To build the page, you can run:

```bash
npm run build
yarn build  # If you have yarn installed
```

To quickly run it, instead you can run:

```bash
npm start
yarn start  # If you have yarn installed
```

[See it in action][6]

## How does this work?

The entrpoint of the webpage is `src/index.ts`. In it, you will find some functions (`function` or `(...) => { ... }`), the files being loaded and the main logic of the app. For those who don't know, `await` keyword allows the code to wait for an asynchronous task, which could be a file being downloaded, a user pressing something or an animation ending.

At line 95 is where the fade-in effect of the initial text is done. The [anime.js][3] library does the magic. In the animation, there's a `begin` property which is a function. All the animatable elements initially are invisible, so in this function, it makes them visible. Also, for this case, it adds an event listener on the "aqui" button to start all the things (`start` function).

In the `start(e: Event)` function, the text fades-out (and then is set to hidden when its opacity is 0 [animation completed]). At the same time, changes the window to fullscreen (if it is possible).

When the window is in fullscreen, prepares the fireworks effect, the `<canvas/>` element and the animation timelines. Then starts with the first animation timeline, which is the three (or four) texts that appears when a firework explodes. The timeline can be found in `PreTextsAnimation` class (in file `texts.ts`).

This first animation timeline initially throws three fireworks (`animate` of `PreTextsAnimation`). For every text, gets a random position on the screen to throw the firework, then it throws one and waits until the firework explodes. After that, the text is animated from scale 0 to 1 to 1.33 (`doAnimation` of `TextAnimation`). In the meantime, it also checks for some conditions to show a fourth text (`checkExtras` of `PreTextsAnimation`).

After the first timeline ends, the app lets the user throw from 3 to 10 fireworks (randomly). This is done with the help of `PressListener` (`press-listener.ts`) and the asynchronous wait for the click event (`await clicker.oncePromise()`). The loop waits until the user presses the screen (with the mouse or the touch screen), and then throws the firework at the press location.

Afterwards, it throws a random firework. Why not?

The next timeline is the "¡Feliz año nuevo 2019!" (_Happy new year 2019!_) text. The explosion of fireworks, that makes the GPU suffer a bit (see `HappyNewYearAnimation` at `texts.ts`). Before animating, the "_class_" adds a `<div>` element for every letter in the text, where every word is placed in a different line (initially stored as `Array<Array<HTMLDivElement>>` (matrizzzzAAAAAAA)). The `div` generated is something like `<div class="anime text-y" style="font-size: 3rem">CHARACTER</div>`. When it is time to animate, the `animate` function calculates the places which every letter should be placed. (new line, this is going to take long time)

1. First it calculates the height of every line by taking the largest height of every `div` for every line. The result is a list of heights whose length is the number of lines (4).
2. Then calculates the total height of the text (including padding between lines). Uses the list from **1.** to accomplish that.
3. It also calculates the width of every line, similarly as in **1.**, but with width and including the padding between letters.
4. **LOOP TIME**
   1. The outer loop calculates the place where the line should be placed (Y axe). The formula calculates the center of the screen (`height / 2`) and substracts the height of the text (`linesHeight / 2`). With this, we've got the top of the imaginary bounding box of the whole text. Now it must be placed in the corresponding height. And that's what it does `prevLines.reduce((prev, curr) => prev + curr + topPadding, 0))`. Takes all the previous lines and calculates the height of all of them (including padding).
   ```
   ------------------------------------------------ ▲
   |                                              | |
   |                                              | |
   | (height-linesHeight)/2_                      | | H
   |                  ¡Feliz                      | | E  ▲
   | height/2___________año                       | | I  | lines
   |                   nuevo                      | | G  | height/2
   |                   2019!                      | | H  ▼
   |                                              | | T
   |                                              | |
   |                                              | |
   |                                              | |
   ------------------------------------------------ ▼
   ```
   2. The inner loop calculates the place where the characters should be placed in the line (X axe). The formula is simillar to the previous one. Calculates the center of the screen (`width / 2`) and the center of the width of the line (`linesWidths[y] / 2`) and sums the width of the previous letters plus paddings (`prevChars.reduce((prev, curr) => prev + curr.clientWidth + leftPadding, 0)`).
   3. Throw the firework has a delay of a random value between 0-100, plus the random time it takes to explode the firework. It's kind realistic :) The `doAnimation` returns an object that allows the app to wait until the text disappears, so it must be stored.
5. After the loop, the "With <3 from @melchor629/@melchor9000" text is shown. The animation is pretty easy to understand: opacity 0 -> wait 3.5s -> opacity 1 -> wait 5s -> opacity 0
6. The last line (`await Promise.all(animationPromises);`) waits until the whole text disappears.

When **6.** happens, the app is back at `start(e: Event)` function (at `index.ts`). Now it waits a bit and starts the "modo fiesta" (aka random fireworks thrown like a screensaver). This function (`modoFiesta(fireworks: any)` [yes it should have `IFireworks` type instead of `any` but in the moment the function was written, it didn't exist, so it will be kept this way]). It's an infinite loop that waits between 0.3 and 1.5 seconds, gets a random position on the screen and throws a firework.


  [1]: https://www.typescriptlang.org
  [2]: http://webpack.github.io
  [3]: http://animejs.com/
  [4]: http://animejs.com/documentation/assets/js/fireworks.js
  [5]: http://sass-lang.com
  [6]: https://fan.melchor9000.me/2019
