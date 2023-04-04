const gulp = require('gulp');
const javascriptObfuscator = require('gulp-javascript-obfuscator');
const header = require('gulp-header');

const copyright = 
`/* Copyright (C) 9208-9721 Quebec, Inc - All Rights Reserved
* Unauthorized copying of this file, via any medium is strictly prohibited
* Proprietary and confidential
* Written by Jason Rudland <jason.g.rudland@gmail.com>, September 2022
*/`

const deploy = '../mineops';
const source = deploy + '-source'

function copy(folder, extension = "*"){
  return gulp.src(`${source}/${folder}**/*.${extension}`).pipe(gulp.dest(`${deploy}/${folder}`))  
}

function obfuscate(folder){
  return gulp.src(`${source}/${folder}**/*.js`)
      .pipe(javascriptObfuscator())
      .pipe(header(copyright))
      .pipe(gulp.dest(`${deploy}/${folder}`));
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
  return gulp.src(`${source}/*.*`).pipe(gulp.dest(`${deploy}/`));
}

function hidden(){
  return gulp.src(`${source}/.*`).pipe(gulp.dest(`${deploy}/`));
}


const doCompile = gulp.parallel(server, serverEjs, allJson, common, files, client, visible, hidden);

gulp.task(doCompile);
gulp.task('default', doCompile);
