'use strict';

const gulp = require('gulp');
const gulpNodemon = require('gulp-nodemon');

gulp.task('start', ()=>{
  gulpNodemon({
    scripts: 'index.js',
    watch: 'src/**/*.js',
    env: {
      NODE_ENV: 'development',
    },
    debug: true,
  });
});

gulp.task('eslint', ()=>{
});

gulp.task('watch', ()=>{
  gulp.watch('src/**/*.js', ['eslint']);
});

gulp.task('default', ['start', 'watch']);
