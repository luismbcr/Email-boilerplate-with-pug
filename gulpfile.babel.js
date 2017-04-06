'use strict';

import gulp from 'gulp';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import fs from 'fs';
import del from 'del';
const $ = require("gulp-load-plugins")({lazy: true});
const config = require("./gulp.config")(args);
const args = require("yargs").argv;
const reload = browserSync.reload;

gulp.task('images', ()=>{
    return gulp.src(config.img.in)
    .pipe($.imagemin())
    .pipe(gulp.dest(config.img.out))
});

gulp.task('index',()=> {
    let dirs = fs.readdirSync('src/emails/');
    return gulp.src('src/index.pug')
    .pipe(pug({
        locals: {links: dirs}
    }))
    .pipe(gulp.dest('dist/'))
});

gulp.task('pug', ()=>{
    return gulp.src('src/emails/**/*.pug')
    .pipe(pug({}))
    .pipe(gulp.dest('dist/'))
});
gulp.task('clean',(cb)=>{
     del.sync(['dist/'],cb);
})
gulp.task('server', ()=>{
    browserSync.init({
        server:{
            baseDir: config.server.root
        }
    });
    gulp.watch(['src/includes/*','src/includes/**/*','src/layout/*.pug','src/index.pug','src/emails/**/*.pug'],['pug','index'])
    .on("change", (event) => {
        config.helpers.changeMsg(event);
    });
    gulp.watch('src/emails/**/img/*',{cwd:'./'},['images']);
    gulp.watch(['dist/*','dist/**/*']).on('change',reload);
});

gulp.task('build',['clean','index','images','pug']);

gulp.task('default',['index','images','pug','server'], () =>{
    $.util.log($.util.colors.green("Project Start"));
});
