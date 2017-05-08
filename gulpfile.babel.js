'use strict';

import gulp from 'gulp';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import fs from 'fs';
import del from 'del';
import path from 'path';
var juice = require('@thasmo/gulp-juice');
const $ = require("gulp-load-plugins")({lazy: true});
const config = require("./gulp.config")(args);
const htmlmin = require('gulp-html-minifier');
const args = require("yargs").argv;
const reload = browserSync.reload;

gulp.task('images', ()=>{
    return gulp.src(config.img.in)
    .pipe($.imagemin())
    .pipe(gulp.dest(config.img.out))
});

gulp.task('index',()=> {
    let dirs = fs.readdirSync('.'+config.email_src);
    return gulp.src(config.index)
    .pipe(pug({
        locals: {links: dirs}
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream:true}))
});

gulp.task('inline',['pug'], function(){
   return gulp.src("dist/**/index.html")
        .pipe(juice({
          includeResources:true,
          removeStyleTags:false,
          preserveMediaQueries: true,
          webResources:{ links:true, scripts:false, images:false, relativeTo: "."}
        }))
        // .pipe($.rename(function(path){
        //   path.basename+= "_inlined"
        // }))
        .pipe(gulp.dest("dist"))
});

gulp.task('pug', ()=>{
    let c_path = "";
    return gulp.src(`.${config.email_src}**/index.pug`)
    .pipe($.data((file) => {
      c_path = path.relative(__dirname, path.dirname(file.path));
      let data = `./${c_path}/data.json`;
      if(fs.existsSync(data)){
        return JSON.parse(fs.readFileSync(data));
      }
    }))
    .pipe(pug())
    .pipe(juice({
      includeResources:true,
      removeStyleTags:false,
      preserveMediaQueries: true,
      webResources:{ links:true, scripts:false, images:false, relativeTo: "."}
    }))
    .pipe(gulp.dest(config.dest))
    .pipe(reload({stream: true}))
});
gulp.task('clean',(cb)=>{
     del.sync([config.dest],cb);
})
gulp.task('server', ()=>{
    browserSync.init({
        server:{
            baseDir: config.server.root
        },
        ghostMode: false,
        logPrefix: "Email-Template",
        logFileChanges: false,
        online: false,
        notify:false
    });
    gulp.watch([config.index,`.${config.email_src}**/*.pug`],['index'])
    .on("change", (event) => {
        config.helpers.changeMsg(event);
    });
    gulp.watch(['src/includes/*','src/layout/*.pug',`.${config.email_src}**/*.pug`, `.${config.email_src}**/data.json`],['pug'])
    .on("change", (event) => {
        config.helpers.changeMsg(event);
    });
    gulp.watch(`.${config.email_src}**/img/*`,{cwd:'./'},['images'])
    .on("change", (event) => {
      reload()
    })
    gulp.watch(`.${config.email_src}**/styles/*.{css,scss}`,['pug'])
      .on("change", (event) => {
        config.helpers.changeMsg(event);
    })
    // gulp.watch(['dist/**/*']).on('change',reload); // meter el reload en cada task esto es un overheat
});

gulp.task('lint-css', function lintCssTask() {
  return gulp
    .src(`.${config.email_src}**/styles/*.{css,scss}`)
    .pipe($.stylelint({
      failAfterError: false,
      reporters: [
        {formatter: 'string', console: true}
      ]
    }));
});

gulp.task('deploy', () => {
  return gulp.src("dist/**/index.html")
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe($.htmlhint({htmlhintrc: ".htmlhintrc"}))
    .pipe($.htmlhint.reporter())
    .pipe(gulp.dest(config.dest))
});

gulp.task('build',['clean','index','images','pug']);

gulp.task('default',['index','images','pug','server'], () =>{
    $.util.log($.util.colors.green("Project Start"));
});
