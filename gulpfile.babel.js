import { dest, series, src, watch } from 'gulp'
import gif from 'gulp-if'
<<<<<<< HEAD
import gsm from 'gulp-sourcemaps'
=======
import gsm from 'gulp-sass'
>>>>>>> 25dc0cc97d4be5d78bd7aad58fae58f78b1c2871

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