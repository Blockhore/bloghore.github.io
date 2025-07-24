const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Paths
const paths = {
  styles: {
    src: 'assets/sass/main.scss',
    dest: 'assets/css/'
  }
};

// Compile Sass + Autoprefixer + Minify
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer()])) // Autoprefixer here
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename('style.css'))
    .pipe(gulp.dest(paths.styles.dest));
}

// Watcher
function watch() {
  gulp.watch('assets/sass/**/*.scss', styles);
}

// Exports
exports.styles = styles;
exports.watch = watch;
exports.default = gulp.series(styles, watch);
