const gulp = require('gulp')
const gulpSass = require('gulp-sass')
const path = require('path')
const postcss = require('gulp-postcss')
const cleanCSS = require('gulp-clean-css')
const autoprefixer = require('autoprefixer')
const gulpif = require('gulp-if')
const cssnano = require('cssnano')
const sourcemaps = require('gulp-sourcemaps')
const browserSync = require('browser-sync')
const globImporter = require('node-sass-glob-importer')
const config = require('../config')

const stylesTailWind = () => {
  const paths = {
    src: config.getTaskSrc('tailwind'),
    dest: config.getTaskDest('tailwind')
  }
  const tailwindcss = require('tailwindcss')
  const includePaths = [
    config.getPathSrc('tailwind'),
    path.join(config.getBase(), 'node_modules')
  ]

  const postcssPlugins = [
    autoprefixer({browsers: ['last 3 versions']})
  ]
  if (global.production) {
    postcssPlugins.push(cssnano({autoprefixer: false, reduceIdents: false}))
  }
  const sassOptions = {
    outputStyle: 'compressed',
    includePaths,
    importer: globImporter()
  }
  if (!global.production) {
    sassOptions.sourceComments = true
    sassOptions.outputStyle = 'nested'
  }

  return gulp.src(paths.src)
  .pipe(gulpif(!global.production, sourcemaps.init()))
  .pipe(gulpSass(sassOptions))
  .on('error', gulpSass.logError)
  .pipe(postcss(postcssPlugins))
  .pipe(postcss([
    tailwindcss(`./src/assets/styles/config/tailwind.config.js`),
    require('autoprefixer')
  ]))
  // .pipe(cleanCSS({compatibility: 'ie8'}))
  .pipe(gulpif(!global.production, sourcemaps.write()))
  .pipe(gulp.dest(paths.dest))
  .pipe(browserSync.stream())
}

gulp.task('stylesTailWind', stylesTailWind)
module.exports = stylesTailWind
