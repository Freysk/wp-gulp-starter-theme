/* ---------------------------------------- */
/*           Stuff to adapt                 */
/* ---------------------------------------- */
const urlTrailingPath = "wp-gulp-starter";
const localServerPort = "8888";

/* ---------------------------------------- */
/*              Variables                   */
/* ---------------------------------------- */
// GENERAL Plugins
const gulp = require('gulp');
const pump = require('pump');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');
// SASS Plugins
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
// JS Plugins
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');

/* ---------------------------------------- */
/*         Déclaration des tasks            */
/* ---------------------------------------- */
// Sass to css, autoprefixing, minification, renaming, copy to destination
gulp.task('sass', (cb) => {
  pump([
    gulp.src('./src/sass/**/*.{sass,scss}')
      .pipe(sourcemaps.init())
      .pipe(sass({ style: 'expanded' }))
      .pipe(autoprefixer({
        browsers: ['last 6 versions'],
        cascade: false
      }))
      .pipe(cleanCSS({ debug: true, compatibility: 'ie8' }, (details) => {
        console.log(`${details.name}: ${details.stats.originalSize}`);
        console.log(`${details.name}: ${details.stats.minifiedSize}`);
      }))
      .pipe(rename((path) => { path.basename += ".min"; }))
      .pipe(sourcemaps.write()),
    gulp.dest('./assets/css')
  ], cb);
});

// JS Babelization, Minification, renaming, copy to destination
gulp.task('js', (cb) => {
  pump([
    gulp.src('src/js/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(rename((path) => { path.basename += ".min"; }))
      .pipe(sourcemaps.write()),
    uglify(),
    gulp.dest('./assets/js')
  ], cb);
});

// Refresh
gulp.task('refresh', function () {
  var files = [
    './*.php',
    './assets/css/*.css',
    './assets/js/*.js',
    './assets/img/*.{png,jpg,gif,svg}'
  ];
  browserSync.init(files, {
    proxy: `localhost:${localServerPort}/${urlTrailingPath}`,
    injectChanges: true
  });
});

/* ---------------------------------------- */
/*              Watch task                  */
/* ---------------------------------------- */
gulp.task('watch', ['sass', 'js'], () => {
  gulp.watch('src/scss/**/*.{sass,scss}', ['sass']);
  gulp.watch('src/js/**/*.js', ['js']);
  gulp.watch('./*.php').on('change', browserSync.reload);
  gulp.watch('./assets/css/*.css').on('change', browserSync.reload);
  gulp.watch('./assets/js/*.js').on('change', browserSync.reload);
});

/* ---------------------------------------- */
/*              Default task                */
/* ---------------------------------------- */
gulp.task('default', ['watch', 'refresh']);
