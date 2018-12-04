// gulp-sass
// gulp-sourcemaps
// gulp-autoprefixer
// gulp-concat
// gulp-clean-css
// gulp
// gulp-if
// browser-sync
var gulp         = require('gulp'),
    sourcemaps   = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    concat       = require('gulp-concat'),
    cleanCss     = require('gulp-clean-css'),
    sass         = require('gulp-sass'),
    gulpIf       = require('gulp-if'),
    browserSync  = require('browser-sync');

var config = {
    paths:{
      scss: './assets/scss/**/*.scss',
      html: './index.html'
    },
    output:{
      cssName: 'main-style.min.css',
      path: './assets/css/'
    },
    // isDevelop:  ture

};


gulp.task('sass',function(){
  return gulp.src(config.paths.scss)
    .pipe(sass())
    .pipe(autoprefixer(['last 3 versions', '> 1%'], { cascade: true }))
    .pipe(gulpIf(config.isDevelop, sourcemaps.write()))
    .pipe(gulp.dest(config.output.path))
});

/* browser sync task */
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: './'
		},
		notify: false
	});
});

/* dev mode */
gulp.task('watch', ['browser-sync', 'sass'], function() {
	gulp.watch(config.paths.scss, ['sass']);
	gulp.watch('./*.html', browserSync.reload);
});

// Run "gulp default" - will start your developer mode
gulp.task('default', ['sass', 'watch']);
