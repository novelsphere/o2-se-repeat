# o2-se-repeat

[![Build Status](https://travis-ci.org/novelsphere/o2-se-repeat.svg?branch=master)](https://travis-ci.org/novelsphere/o2-se-repeat)

- Repeat se for a specific count.
- Optionally add a delay between repeats.

- SEを何回か繰り返すプラグイン
- 遅延も指定できます

## Usage 使い方

- Download `se-repeat.js`

- Move `se-repeat.js` file to your project's plugin folder

- Add this to the beginning of your `first.ks`
  ```
  [o2_loadplugin module="se-repeat.js"]
  ```

- Use it like this
  ```
  [playse o2_repeat=3 o2_repeat_delay=2000]
  ```
  - This means repeat 3 times, with 2 seconds delay between

------

- `se-repeat.js` をダウンロード

- ファイルをプロジェクトの plugin フォルダーに移動

- `first.ks` の最初にこれを追加

  ```
  [o2_loadplugin module="se-repeat.js"]
  ```

- こういう風に使います

  ```
  [playse o2_repeat=3 o2_repeat_delay=2000]
  ```

  - 三回リピートして、間に2秒待つ  
