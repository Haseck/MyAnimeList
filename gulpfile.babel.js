import { dest, series, src, watch } from 'gulp'
import gif from 'gulp-if'
import gsm from 'gulp-sass'

const sourcemaps = false,

  sass = () => {
    return src('./scss/*.scss')
      .pipe(gif(sourcemaps, gsm.init()))
      .pipe(require('gulp-sass')({ includePaths: [require('node-normalize-scss').includePaths] }))
      .pipe(gif(sourcemaps, gsm.write()))
      .pipe(dest('./css/'))
  }

exports.default = () => {
  watch('./scss/**/*.scss', series(sass))
}