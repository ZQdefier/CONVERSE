
const gulp = require('gulp'),
      htmlmin = require('gulp-htmlmin'),
      minifyCss = require('gulp-minify-css'),
      sass = require('gulp-sass'),
      uglify = require('gulp-uglify'),
      babel = require('gulp-babel'),
      connect = require('gulp-connect');

// 制定一个html任务
gulp.task('html', () => {
  // 压缩html
  gulp.src('src/**/*.html')
      .pipe(htmlmin({
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: false,//不删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS 
      }))
      .pipe(gulp.dest('dist'))
      .pipe(connect.reload());
})

// 制定css任务
gulp.task('css', () => {
  // 编译scss
  // 压缩css
   // 除了module里面的scss都要编译
  gulp.src(['src/css/**/*.scss', "!src/module/*.scss" ])
      .pipe(sass())
      .pipe(minifyCss())
      .pipe(gulp.dest('dist/css'))
      .pipe(connect.reload());
})

// 制定js任务
gulp.task('js', () => {
  // ES6转ES5
  // 压缩
  gulp.src('src/js/**/*.js')
      .pipe(babel({
        presets: ['@babel/env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist/js'))
      .pipe(connect.reload());
})

// 制定libs任务
gulp.task('libs', () => {
  // 移动
  gulp.src('src/libs/**/*').pipe(gulp.dest('dist/libs'));
})

// 制定images任务
gulp.task('imgs', () => {
  // 移动
  gulp.src('src/imgs/**/*').pipe(gulp.dest('dist/imgs'));
})

// 监听
gulp.task('watch', () => {
  gulp.watch('src/**/*.html', ['html']);
  gulp.watch('src/css/**/*.scss', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);
})

// 开服务器
gulp.task('server', () => {
  connect.server({
    root: 'dist',
    port: 8848,
    livereload: true
  });
})

gulp.task('default', ['html', 'css', 'js', 'libs', 'imgs', 'server', 'watch']);