import { dest, series, src, watch } from 'gulp'
import gif from 'gulp-if'
import imagemin, { gifsicle, mozjpeg, optipng, svgo } from 'gulp-imagemin'
import gsm from 'gulp-sourcemaps'
import g_sass from 'gulp-sass'
import normalize from 'node-normalize-scss'
import cssnano from 'gulp-cssnano'

const sourcemaps = false,
  paths = {
    scss: {
      src: './src/scss/*.scss',
      dest: '../../../Dropbox/myanimelist/css',
      wtc: './src/scss/**/*.scss'
    },
    img: {
      src: './src/image/**/*.png',
      dest: '../../../Dropbox/myanimelist/image'
    }
  },
  sass = () => src(paths.scss.src)
    .pipe(gif(sourcemaps, gsm.init()))
    .pipe(g_sass({ includePaths: [normalize.includePaths] }))
    .pipe(cssnano({
      autoprefixer: {
        add: true,
        browsers: '> 2%, last 2 versions, Firefox ESR'
      }
    }))
    .pipe(gif(sourcemaps, gsm.write()))
    .pipe(dest(paths.scss.dest))
  ,
  img = () => src(paths.img.src)
    .pipe(imagemin([gifsicle(), mozjpeg(), optipng(), svgo()], { verbose: true }))
    .pipe(dest(paths.img.dest))


exports.default = () => {
  watch(paths.scss.wtc, { events: 'all' }, series(sass))
  watch(paths.img.src, { events: 'all' }, series(img))
}