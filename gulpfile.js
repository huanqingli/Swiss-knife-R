/**
 * Created by Muc on 16/12/22.
 */
var gulp = require('gulp');
var babelify = require("babelify");
var browserify = require('browserify');
var source = require('vinyl-source-stream');
gulp.task('browserify', function() {
    browserify("jsx/index.js")
        .transform("babelify",{presets: ["env", 'react'],plugins:["transform-object-rest-spread","transform-export-extensions"]} )
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('js'))
});
gulp.task('browserifyTest', function() {
    browserify("test/jsx/index.js")
        .transform("babelify",{presets: ["env", 'react'],plugins:["transform-object-rest-spread","transform-export-extensions"]} )
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('test/js'))
});
gulp.task('watch', function () {

    // 看守所有.js档
    gulp.watch('jsx/*.js', ['browserify']);
    gulp.watch('jsx/**/*.js', ['browserify']);

    gulp.watch('test/jsx/*.js', ['browserifyTest']);
    gulp.watch('test/jsx/**/*.js', ['browserifyTest']);


    // 看守所有图片档
    //gulp.watch('src/images/**/*', ['images']);

});