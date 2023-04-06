const { parallel, series, src, dest, task} = require('gulp');
const javascriptObfuscator = require('gulp-javascript-obfuscator');
const header = require('gulp-header');
const editor = require("gulp-json-editor");
const bump = require('gulp-bump');

 
const copyright = 
`/* Copyright (C) 9208-9721 Quebec, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Jason Rudland <jason.g.rudland@gmail.com>, September 2022
*/`

const deploy = '../mineops';
const source = deploy + '-source'

function copy(folder, extension = "*"){
  return src(`${source}/${folder}**/*.${extension}`).pipe(dest(`${deploy}/${folder}`))  
}

function obfuscate(folder){
  return src(`${source}/${folder}**/*.js`)
      .pipe(javascriptObfuscator())
      .pipe(header(copyright))
      .pipe(dest(`${deploy}/${folder}`));
}

function server(){
  return obfuscate("server/")
}

function serverEjs(){
  return copy("server/", "ejs");
}

function allJson(){
  copy("server/", "json");
  return copy ("common/","json");
}

function common(){
  return obfuscate("common/")
}

function data(){
  return copy("data/");
}

function files(){
  return copy("files/");
}

function client(){
  return copy("client/");
}

function visible(){
  return src(`${source}/*.*`).pipe(dest(`${deploy}/`));
}

function hidden(){
  return src(`${source}/.*`).pipe(dest(`${deploy}/`));
}

function dbClean(){
  return src(`${source}/server/db.json`)
    .pipe(editor({'models': {"AccessToken" : null}}))
    .pipe(dest(`${deploy}/server`));
}

function doBump() {
  let importance = (process.argv.join(",").match(/\-\-bump([^,]*)/i) || ["","bad name"])[1].toLowerCase().replace(/\W+/g,""); 
  if (!/^(major|minor|patch|prerelease)$/.test(importance)) {
    importance = "patch";
  }
  return incVersion(importance);
}

function incVersion(importance) {
  return src([`${source}/package.json`, `${source}/bower.json`], {allowEmpty:true})
    .pipe(bump({type: importance}))
    .pipe(dest(`${source}/`));
}

const preCompile = parallel(server, serverEjs, allJson, common, data, files, client, visible, hidden);
const doCompile = series(doBump, preCompile, dbClean);  

task(doCompile);
task('default', doCompile);
