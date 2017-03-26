'use strict';

import gulp from 'gulp';
import pug from 'gulp-pug';
import browserSync from 'browser-sync';
import fs from 'fs';

const reload = browserSync.reload;

gulp.task('images', ()=>{
    return gulp.src('src/emails/**/img/*.{png,gif,jpg}')
    .pipe(gulp.dest('dist/'))
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

gulp.task('server', ()=>{
    browserSync.init({
        server:{
            baseDir: 'dist/'
        }
    });
    gulp.watch(['src/includes/*','src/includes/**/*','src/layout/*.pug','src/index.pug','src/emails/**/*.pug'],['pug','index']);
    gulp.watch('src/emails/**/img/*.',{cwd:'./'},['images']);
    gulp.watch([
    'dist/*.pug',
    'dist/**/*'
    ]).on('change', reload);
});


gulp.task('default',['index','images','pug','server']);