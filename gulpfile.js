"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var rename = require("gulp-rename");
var del = require("del");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var imagemin = require("gulp-imagemin");
var csso = require("gulp-csso");
var minjs = require("gulp-minify");

gulp.task("refresh", function(done) {
  server.reload();
  done();
})
gulp.task("css", function () {
  return gulp.src("source/css/style.css")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});
gulp.task("html", function() {
  return gulp.src("source/*.html")
  .pipe(gulp.dest("build"));
})
gulp.task("js", function() {
  return gulp.src("source/js/**/*.js")
  .pipe(minjs( {
    ignoreFiles: ['*.min.js', '*-min.js'],
    noSource: true}
  ))
  .pipe(gulp.dest("build/js"));
})
gulp.task("images", function() {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 3}),
    imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
  ]))
  .pipe(gulp.dest("source/img"));
});

gulp.task("rename", function() {
  return gulp.src("source/img/**/webp-*.{png,jpg}")
  .pipe(webp({quality: 90}))
  .pipe(gulp.dest("source/img"));
});

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/img/icon-*.svg", gulp.series("sprite", "refresh"));
  gulp.watch("source/**/*.{html, js}", gulp.series("html", "js", "refresh"));
});

gulp.task("copy", function() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.html",
    "source/css/normalize.min.css"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});
gulp.task("clean", function() {
  return del("build");
});

gulp.task("optimize", gulp.series("images"));
gulp.task("build", gulp.series("clean", "copy", "css",  "html", "js"));
gulp.task("start", gulp.series("build", "server"));
