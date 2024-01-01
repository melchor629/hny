# Happy New Years

You can see the source code of the _Happy New Year_ of every year I made one. Not all pages are in english, some could be in spanish.

- Run `npm i` to install all packages
- Run `npm start -w packages/${YEAR}` to try a specific project in local
- Run `npm run build -ws --if-present` to build all packages
- Run `npm run dist` to prepare the `dist` folder with all built packages on it
- Run `npm run serve` to serve the `dist` folder locally at port 3000
- Run `npm run serve:docker` to serve the `dist` folder locally using the custom nginx configuration at port 3000
- Run `npm run docker` to build the docker image
- Run `docker container run --rm -it -p 80:80 hny-melchor9000` to run the docker image, and go to [http://localhost](http://localhost) to see the web in action.
- Some projects require the API to be up, run `npm start -w packages/hny-api`. It requires a vercel account btw...
- To download the assets, run `./scripts/assets.sh pull`!

Have fun :)

## Years

- [home][7] (well that is only the [home page][8])
- [2018][1] ([see it in action][3])
- [2019][2] ([see it in action][4])
- [2020][5] ([see it in action][6])
- [2021][9] ([see it in action][10])
- [2022][11] ([see it in action][12])
- [2023][13] ([see it in action][14])
- [2024][15] ([see it in action][16])

[1]: https://github.com/melchor629/hny/tree/master/packages/2018
[2]: https://github.com/melchor629/hny/tree/master/packages/2019
[3]: https://fan.melchor9000.me/2018/
[4]: https://fan.melchor9000.me/2019/
[5]: https://github.com/melchor629/hny/tree/master/packages/2020
[6]: https://fan.melchor9000.me/2020/
[7]: https://github.com/melchor629/hny/tree/master/packages/home
[8]: https://fan.melchor9000.me/
[9]: https://github.com/melchor629/hny/tree/master/packages/2021
[10]: https://fan.melchor9000.me/2021/
[11]: https://github.com/melchor629/hny/tree/master/packages/2022
[12]: https://fan.melchor9000.me/2022/
[13]: https://github.com/melchor629/hny/tree/master/packages/2023
[14]: https://fan.melchor9000.me/2023/
[13]: https://github.com/melchor629/hny/tree/master/packages/2024
[14]: https://fan.melchor9000.me/2024/
