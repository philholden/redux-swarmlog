# Component Boilerplate

[![travis build](https://img.shields.io/travis/philholden/component-boilerplate.svg?style=flat-square)](https://travis-ci.org/philholden/component-boilerplate)
[![codecov coverage](https://img.shields.io/codecov/c/github/philholden/component-boilerplate.svg?style=flat-square)](https://codecov.io/github/philholden/component-boilerplate)
[![version](https://img.shields.io/npm/v/@philholden/component-boilerplate.svg?style=flat-square)](http://npm.im/@philholden/component-boilerplate)
[![downloads](https://img.shields.io/npm/dm/@philholden/component-boilerplate.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@philholden/component-boilerplate&from=2015-08-01)
[![CC0 License](https://img.shields.io/npm/l/@philholden/component-boilerplate.svg?style=flat-square)](https://creativecommons.org/publicdomain/zero/1.0/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square)](https://github.com/semantic-release/semantic-release)


This is a hybrid of [React Transform Boilerplate](https://github.com/gaearon/react-transform-boilerplate) and Kent C Dodds' [How to Write an Open Source JavaScript Library](https://egghead.io/lessons/javascript-how-to-write-a-javascript-library-introduction). It has the following features:

* Babel 6 hot loading
* Testing via AVA
* Null loaders to allow unit testing where components use loaders for CSS or images 
* WebSockets via Socket.IO set up on server (delete if not needed)
* All the semantic release, code coverage etc from Kent C Dodds

## Installation

```bash
git clone https://github.com/philholden/component-boilerplate.git
cd component-boilerplate
npm install
npm start
open http://localhost:3000
```

## When setting up a new repo

`semantic-release-cli setup`

## License

CC0 (public domain)
