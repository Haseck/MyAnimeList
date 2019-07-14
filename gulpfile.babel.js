import { dest, series, src, watch } from 'gulp'
import gif from 'gulp-if'
import imgmin from 'gulp-imagemin'
import gsm from 'gulp-sourcemaps'

const sourcemaps = false,
  paths = {
    scss: {
      src: './src/scss/*.scss',
      dest: 'C:\\Users\\Esparza\\Dropbox\\myanimelist\\css',
      wtc: './src/scss/**/*.scss'
    },
    img: {
      src: './src/image/**/*.png',
      dest: 'C:\\Users\\Esparza\\Dropbox\\myanimelist\\image'
    }
  },
  sass = () => {
    return src(paths.scss.src)
      .pipe(gif(sourcemaps, gsm.init()))
      .pipe(require('gulp-sass')({ includePaths: [require('node-normalize-scss').includePaths] }))
      .pipe(require('gulp-cssnano')({
        autoprefixer: {
          add: true,
          browsers: '> 1%, last 2 versions, Firefox ESR, Opera 12.1'
        }
      }))
      .pipe(gif(sourcemaps, gsm.write()))
      .pipe(dest(paths.scss.dest))
  },
  img = () => {
    return src(paths.img.src)
      .pipe(imgmin([imgmin.gifsicle(), imgmin.jpegtran(), imgmin.optipng(), imgmin.svgo()], { verbose: true }))
      .pipe(dest(paths.img.dest))
  }

exports.default = () => {
  watch(paths.scss.wtc, { events: 'all' }, series(sass))
  watch(paths.img.src, { events: 'all' }, series(img))
}