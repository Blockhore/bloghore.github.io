const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const notify = require('gulp-notify');

// Paths
const paths = {
  styles: {
    src: 'assets/sass/main.scss',
    dest: 'assets/css/'
  }
};

// Compile SCSS to CSS with sourcemaps, autoprefixer, and minify
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', notify.onError("SCSS Error: <%= error.message %>")))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(rename('style.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.styles.dest));
}

// Watch files
function watch() {
  gulp.watch('assets/sass/**/*.scss', styles);
}

// Export tasks
exports.styles = styles;
exports.watch = watch;
exports.default = gulp.series(styles, watch);
exports.build = gulp.series(styles);
