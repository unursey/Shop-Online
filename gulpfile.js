import gulp from "gulp";
import browserSync from "browser-sync";
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import cssimport from "gulp-cssimport";
import del from 'del';

const prepros = true;

const sass = gulpSass(sassPkg);

// задачи

export const html = () => gulp
    .src("src/*.html")
    .pipe(gulp.dest("dist"))
    .pipe(browserSync.stream());

// export const css = () => gulp
//   .src("src/css/index.css")
//   .pipe(cssimport({
//     extensions: ['css'],
//   }))
//   .pipe(gulp.dest("dist/css"))
//   .pipe(browserSync.stream());

export const style = () => {
  if (prepros) {
    return gulp
      .src('src/scss/**/*.scss')
      .pipe(sass().on('error', sass.logError))  
      .pipe(gulp.dest('dist/css'))
      .pipe(browserSync.stream());
  }

  return gulp
    .src("src/css/index.css")
    .pipe(cssimport({
      extensions: ['css'],
    }))
    .pipe(gulp.dest("dist/css"))
    .pipe(browserSync.stream());
}

export const js = () => gulp
    .src("src/js/**/*.js")
    .pipe(gulp.dest("dist/js"))
    .pipe(browserSync.stream())
    .pipe(browserSync.stream());
 
export const copy = () => gulp
    .src([
        'src/fonts/**/*',
        'src/img/**/*',
    ], {
        base: 'src'
    }) 
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({
        once: true
    }));

export const server = () => {
  browserSync.init({
    ui: false,
    notify: false,
   // tunnel: true,
    server: {
      baseDir: "dist",
    },
  });

  gulp.watch('./src/**/*.html', html);
  // gulp.watch('./src/css/**/*.css', css);
  gulp.watch(prepros ? './src/scss/**/*.scss' : './src/css/**/*.css', style);
  gulp.watch('./src/js/**/*.js', js);
  gulp.watch(['./src/img/**/*', './src/fonts/**/*'], copy);
};

export const clear = () => del('dist/**/*', {forse: true,});

// запуск

export const base = gulp.parallel(html, style, js, copy);

export const build = gulp.series(clear, base);

export default gulp.series(base, server);

