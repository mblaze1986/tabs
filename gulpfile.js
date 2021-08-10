let project_folder = 'dist'
let source_folder = 'src'

let path = {
  build: {
    html: project_folder + '/',
    css: project_folder + '/css/',
    js: project_folder + '/js/',
    img: project_folder + '/img/',
    fonts: project_folder + '/fonts/',
    php: project_folder + '/php/',
    favicon: project_folder + '/favicon/'
  },

  src: {
    html: source_folder + '/*.html',
    css: source_folder + '/scss/--style.scss',
    js: source_folder + '/js/--script.js',
    img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}',
    fonts: source_folder + '/fonts/**/*',
    php: source_folder + '/php/**/*',
    favicon: source_folder + '/favicon/**/*'
  },

  watch: {
    html: source_folder + '/**/*.html',
    css: source_folder + '/scss/**/*.scss',
    js: source_folder + '/js/**/*.js',
    img: source_folder + '/img/**/*.{jpg,png,svg,gif,ico,webp}'
  },

  clean: './' + project_folder + '/'
}

let { src, dest } = require('gulp')
gulp = require('gulp')
browsersync = require('browser-sync').create()
fileinclude = require('gulp-file-include')
del = require('del')
scss = require('gulp-sass')
autoprefixer = require('gulp-autoprefixer')
clean_css = require('gulp-clean-css')
uglify = require('gulp-uglify-es').default
imagemin = require('gulp-imagemin')
sourcemaps = require('gulp-sourcemaps')
htmlmin = require('gulp-htmlmin')

function browserSync() {
  browsersync.init({
    server: {
      baseDir: './' + project_folder + '/'
    },
    port: 3000,
    // notify: false
  })
}

function html() {
  return src(path.src.html)
    .pipe(fileinclude({
      prefix: '@@'
    })
    )
    .pipe(
      htmlmin({
        collapseWhitespace: true,
        removeComments: true,
        minifyJS: true
      })
    )
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream())
}

function css() {
  return src(path.src.css)
    .pipe(sourcemaps.init())
    .pipe(
      scss({
        outputStyle: 'expanded'
      })
    )
    .pipe(
      autoprefixer({
        overrideBrowserslist: ['last 5 versions'],
        cascade: true
      })
    )
    .pipe(clean_css({
      // format: 'beautify'
    }))
    .pipe(sourcemaps.write())
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream())
}

function js() {
  return src(path.src.js)
    .pipe(fileinclude())
    .pipe(uglify())
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream())
}

function images() {
  return src(path.src.img)
    .pipe(
      imagemin({
        progressive: true,
        svgoPlugins: [{ removeViewBox: false }],
        interlaced: true,
        optimizationLevel: 3
      })
    )
    .pipe(dest(path.build.img))
    .pipe(browsersync.stream())
}

function php() {
  return src(path.src.php)
    .pipe(dest(path.build.php))
}

function favicon() {
  return src(path.src.favicon)
    .pipe(dest(path.build.favicon))
}

function fonts() {
  return src(path.src.fonts)
    .pipe(dest(path.build.fonts))
}

function watchFiles() {
  gulp.watch([path.watch.html], html)
  gulp.watch([path.watch.css], css)
  gulp.watch([path.watch.js], js)
  gulp.watch([path.watch.img], images)
}

function clean() {
  return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel(fonts, images, php, favicon, js, css, html))
let watch = gulp.series(build, gulp.parallel(watchFiles, browserSync))

exports.images = images
exports.html = html
exports.css = css
exports.js = js
exports.php = php
exports.favicon = favicon
exports.fonts = fonts
exports.build = build
exports.watch = watch
exports.default = watch