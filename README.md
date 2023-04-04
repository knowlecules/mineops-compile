# MineOps-compile

## About

MineOps-compile is simply a gulp script that copies or obfuscates mineops source code into a deployable folder. 


## Requirements

* Node 8
* git
* gulp https://gulpjs.com/docs/en/getting-started/quick-start/

## Common setup

Clone the repo and install the dependencies.

```bash
git clone https://github.com/knowlecules/mineops-compile.git
cd mineops-compile
```

```bash
npm install
```

```bash
npm install --global gulp-cli
```


## Required directories

Mineops-compile is a gulp script to copy and selectively obfuscate from a "source" folder to a deployable folder

> mineops-source

You will need to have mineops-source in the same root folder or you can edit the gulpfile.js

> mineops

Mineops-source will be copied to mineops with a number of source files being obfuscated


## Running

Run gulp from the root directory

```bash
gulp
```
If all runs well you will have a folder filled in about 3 seconds
